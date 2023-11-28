import { ArticleInfo } from '@/types/articles';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req: Request) {
    const response: Array<ArticleInfo> = await query("SELECT * FROM article", []) as Array<ArticleInfo> || [];

    let destination;
  
    if (response.length === 0) {
      destination = '/';
    } else {
      const id = Math.floor(Math.random() * response.length);
      destination = '/article/' + response[id].slug; 
    }

    console.log(req.url);
    return Response.redirect(req.headers.get('host') + destination);
}