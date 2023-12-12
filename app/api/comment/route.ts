import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { CommentInfoRow } from '@/types/comments';

const authorNameRegex = /^[a-zA-Z0-9\u00C0-\u017F\s']{3,64}$/;
const commentContentRegex = /^[\w\s.,'"!?(){}[\]]{3,256}$/;

export async function POST(req: NextRequest) {
    let ipAddress: string | undefined = req.headers.get('x-forwarded-for') || req.ip;

    if (ipAddress?.startsWith('::ffff:')) {
      ipAddress = ipAddress.substring(7);
    }

    const json: {articleId: number, author: string, content: string} = await req.json();

    if (json.author && !json.author.match(authorNameRegex)) {
        return Response.json({
            result: "fail",
            message: "Author name contains characters that are not allowed, or is too long/short."
        });
    }

    if (!json.content.match(commentContentRegex)) {
        return Response.json({
            result: "fail",
            message: "Comment content contains characters that are not allowed, or is too long/short."
        });
    }

    if (!json.author) {
        json.author = 'Anonymous';
    }

    const likeFromIP: CommentInfoRow[] = await query('SELECT * FROM `comment` WHERE ip_address = ? AND article_id = ? ORDER BY comment_date DESC LIMIT 1', [ipAddress, json.articleId]) as CommentInfoRow[];

    if (likeFromIP.length === 0 || new Date().getTime() - likeFromIP[0].comment_date.getTime() > 3600000 * 24) {
        const res = await query('INSERT INTO `comment` (article_id, author, content, ip_address) VALUES (?, ?, ?, ?)', [json.articleId, json.author, json.content, ipAddress]);

        return Response.json({
            result: "ok",
            message: "Comment added!",
            comment: {
                id: (res as {insertId: number}).insertId,
                author: json.author,
                content: json.content,
                comment_date: new Date(),
                like_count: 0,
                liked: false,
                replies: []
            }
        });
    } else {
        return Response.json({
            result: "fail",
            message: "You need to wait 24 hours before commenting on this article again!"
        });
    }
}

export async function DELETE(req: NextRequest) {
    let ipAddress: string | undefined = req.headers.get('x-forwarded-for') || req.ip;

    if (ipAddress?.startsWith('::ffff:')) {
      ipAddress = ipAddress.substring(7);
    }

    const json: {articleId: number, commentId: number} = await req.json();

    await query('DELETE FROM `comment` WHERE id = ? AND ip_address = ? AND article_id = ?', [json.commentId, ipAddress, json.articleId]);
    
    return Response.json({
        result: "ok",
        message: "Comment removed!"
    });
}