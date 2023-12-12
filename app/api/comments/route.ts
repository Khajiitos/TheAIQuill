import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { ArticleInfoWithLike } from '@/types/articles';
import { CommentInfo, CommentInfoRow, CommentInfoWithLike } from '@/types/comments';

export async function GET(req: NextRequest) {
    const articleId = Number(req.nextUrl.searchParams.get('articleId')) || -1;

    let ipAddress: string | undefined = req.headers.get('x-forwarded-for') || req.ip;

    if (ipAddress?.startsWith('::ffff:')) {
      ipAddress = ipAddress.substring(7);
    }

    const response: CommentInfoRow[] = await query("SELECT comment.*, COUNT(comment_like.id) as like_count, (CASE WHEN EXISTS (SELECT 1 FROM `comment_like` WHERE `comment_like`.comment_id = comment.id AND `comment_like`.ip_address = ?) THEN true ELSE false END) AS comment_liked FROM comment LEFT JOIN comment_like ON comment_like.comment_id = comment.id WHERE comment.article_id = ? AND reply_to IS NULL GROUP BY comment.id ORDER BY comment.comment_date DESC", [ipAddress, articleId]) as CommentInfoRow[] || [];

    const comments: CommentInfoWithLike[] = [];

    for (let i = 0; i < response.length; i++) {
        const commentInfo: CommentInfoRow = response[i];
        comments.push({
            id: commentInfo.id,
            author: commentInfo.author,
            content: commentInfo.content,
            comment_date: commentInfo.comment_date,
            like_count: commentInfo.like_count,
            comment_liked: commentInfo.comment_liked,
            replies: []
        });
    }

    return Response.json(comments);
}