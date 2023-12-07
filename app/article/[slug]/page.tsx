import Article from '@/components/article';
import { ArticleInfo, ArticleInfoWithLike } from '@/types/articles';
import { Metadata } from 'next';
import { query } from '@/lib/db';
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: {params: {slug: string}}) : Promise<Metadata> {
  const response: Array<ArticleInfo> = await query("SELECT * FROM article WHERE slug = ?", [props.params.slug]) as Array<ArticleInfo> || [];

  const data: ArticleInfo | null = response.length === 1 ? response[0] : null;

  if (!data) {
    return {};
  }

  return {
    title: data.article_header + " - The AI Quill",
    description: data.article_description,
    openGraph: {
      title: data.article_header,
      description: data.article_description,
      type: 'article',
      publishedTime: data.creation_date.toISOString(),
      authors: ['GPT-3.5-turbo']
    }
  }
}

export default async function ArticlePage(props: {params: {slug: string}}) {
  let ipAddress: string | null = headers().get('x-forwarded-for');

  if (ipAddress?.startsWith('::ffff:')) {
    ipAddress = ipAddress.substring(7);
  }

  const response: ArticleInfoWithLike[] = await query("SELECT article.*, COUNT(`like`.article_id) AS like_count, (CASE WHEN EXISTS (SELECT 1 FROM `like` WHERE `like`.article_id = article.article_id AND `like`.ip_address = ?) THEN true ELSE false END) AS liked FROM article LEFT JOIN `like` ON `like`.article_id = article.article_id WHERE slug = ? GROUP BY article.article_id;", [ipAddress, props.params.slug]) as ArticleInfoWithLike[] || [];

  const articleInfo: ArticleInfoWithLike | null = response.length >= 1 ? response[0] : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-5">
        <Article articleInfo={articleInfo}></Article>
    </main>
  )
}