import Article from '@/components/article';
import { Pool, QueryFunction, QueryOptions } from 'mysql';
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

export default async function ArticlePage(props: {params: {slug: string}}) {
  const response: any = await query(db, "SELECT * FROM article WHERE slug = ?", [props.params.slug]);

  const data = response.length === 1 ? response[0] : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-500">
        <Article articleData={data}></Article>
    </main>
  )
}
