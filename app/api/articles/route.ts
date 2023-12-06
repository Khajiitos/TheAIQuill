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

    const searchPhrase = req.nextUrl.searchParams.get('search');

    const response: ArticleInfo[] = await (minId == -1 ?
        query("SELECT article.*, COUNT(`like`.article_id) AS like_count FROM article LEFT JOIN `like` ON `like`.article_id = article.article_id GROUP BY article.article_id ORDER BY article.creation_date DESC LIMIT 11;", []) :
        query("SELECT article.*, COUNT(`like`.article_id) AS like_count FROM article LEFT JOIN `like` ON `like`.article_id = article.article_id WHERE article.article_id < ? GROUP BY article.article_id ORDER BY article.creation_date DESC LIMIT 11;", [minId])
    ) as ArticleInfo[] || [];

    if (searchPhrase) {
        response.filter(articleInfo => articleInfo.article_header.toLowerCase().includes(searchPhrase.toLowerCase()) || articleInfo.article_description.toLowerCase().includes(searchPhrase.toLowerCase()));
    }

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