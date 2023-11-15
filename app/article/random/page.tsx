import Article from '@/components/article';
import { ArticleInfo } from '@/types/articles';
import { Pool, QueryFunction, QueryOptions } from 'mysql';
import { redirect } from 'next/navigation';
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

export default async function RandomArticlePage() {
  const response: Array<ArticleInfo> = await query(db, "SELECT * FROM article", []) as Array<ArticleInfo>;

  if (response.length === 0) {
    redirect('/');
  } else {
    const id = Math.floor(Math.random() * response.length);
    console.log('ID: ' + id + " Length: " + response.length);
    redirect('/article/' + response[id].slug); 
  }
}
