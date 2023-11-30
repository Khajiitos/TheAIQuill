export interface ArticleInfo {
    slug: string;
    article_id: number;
    article_header: string;
    article_description: string;
    article_content: string;
    creation_date: Date;
}

export interface ArticleProp {
    articledata: ArticleInfo | null;
}

export interface PartialArticles {
    articles: ArticleInfo[],
    hasMore: boolean
}