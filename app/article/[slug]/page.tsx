import Article from '@/components/article';
import { ArticleInfo } from '@/types/articles';
import { Pool, QueryFunction, QueryOptions } from 'mysql';
import { Metadata } from 'next';
import Head from 'next/head';
const db = require('@/lib/db');

function query(db: Pool, sql: string | QueryOptions, values: any) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export async function generateMetadata(props: {params: {slug: string}}) : Promise<Metadata> {
  const response: any = await query(db, "SELECT * FROM article WHERE slug = ?", [props.params.slug]);

  const data: ArticleInfo = response.length === 1 ? response[0] : null;

  if (!data) {
    return {};
  }

  return {
    title: data.article_header + " - The AI Quill",
    description: data.article_description
  }
}

export default async function ArticlePage(props: {params: {slug: string}}) {
  const response: any = await query(db, "SELECT * FROM article WHERE slug = ?", [props.params.slug]);

  const data: ArticleInfo = response.length === 1 ? response[0] : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-5">
        <Article articleData={data}></Article>
    </main>
  )
}
