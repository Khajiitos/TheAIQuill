import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { ArticleInfo, PartialArticles } from '@/types/articles';

export async function GET(req: NextRequest) {
    const minId = Number(req.nextUrl.searchParams.get('minId')) || -1;

    if (minId == null) {
        return Response.json({
            articles: [],
            hasMore: false
        });
    }

    const response: ArticleInfo[] = await (minId == -1 ? query("SELECT * FROM article ORDER BY creation_date DESC LIMIT 11;", []) : query("SELECT * FROM article WHERE article_id < ? ORDER BY creation_date DESC LIMIT 11;", [minId])) as ArticleInfo[] || [];

    const articles = [];

    for (let i = 0; i < Math.min(10, response.length); i++) {
        const articleInfo: ArticleInfo = response[i];
        articles.push(articleInfo);
    }

    return Response.json({
        hasMore: response.length === 11,
        articles: articles
    });
}