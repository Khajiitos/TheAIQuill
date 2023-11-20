import { ArticleInfo } from '@/types/articles';
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
export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req: Request) {
    const response: Array<ArticleInfo> = await query(db, "SELECT * FROM article", []) as Array<ArticleInfo>;

    let destination;
  
    if (response.length === 0) {
      destination = '/';
    } else {
      const id = Math.floor(Math.random() * response.length);
      destination = '/article/' + response[id].slug; 
    }
    
    return Response.redirect(req.headers.get('host') + destination);
}