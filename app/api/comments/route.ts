import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { ArticleInfoWithLike } from '@/types/articles';
import { CommentInfo, CommentInfoRow } from '@/types/comments';

export async function GET(req: NextRequest) {
    const articleId = Number(req.nextUrl.searchParams.get('articleId')) || -1;

    const response: CommentInfoRow[] = await query("SELECT * FROM comment WHERE article_id = ? AND reply_to IS NULL ORDER BY comment_date DESC", [articleId]) as CommentInfoRow[] || [];

    const comments: CommentInfo[] = [];

    for (let i = 0; i < response.length; i++) {
        const commentInfo: CommentInfoRow = response[i];
        comments.push({
            id: commentInfo.id,
            author: commentInfo.author,
            content: commentInfo.content,
            comment_date: commentInfo.comment_date,
            replies: []
        });
    }

    return Response.json(comments);
}