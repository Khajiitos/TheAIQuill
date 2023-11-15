import ArticleContainer from '@/components/article_container';
import { ArticleInfo } from '@/types/articles';
import { Pool, QueryOptions } from 'mysql';
import Link from 'next/link';
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

export const dynamic = 'force-dynamic';

export default async function Home() {
  let response: Array<ArticleInfo>;
  try {
    response = await query(db, "SELECT * FROM article ORDER BY creation_date DESC", []) as Array<ArticleInfo>;
  } catch(e) {
    response = [];
  }
  
  console.log(response);

  return (
    <main className="">
      <h3 className='text-center font-semibold text-4xl m-5 text-white'>Available articles</h3>

      <div className='flex justify-center content-center flex-row'>
        <ArticleContainer articles={response}></ArticleContainer>
      </div>
    </main>
  )
}
