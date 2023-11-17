'use server'

import Article from '@/components/article';
import { ArticleInfo } from '@/types/articles';
import { Pool, QueryFunction, QueryOptions } from 'mysql';
import { GetServerSideProps } from 'next';
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

  let destination;

  if (response.length === 0) {
    destination = '/';
  } else {
    const id = Math.floor(Math.random() * response.length);
    destination = '/article/' + response[id].slug; 
  }

  console.log('Redirect to ' + destination);

  redirect(destination);
}
