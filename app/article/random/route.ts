import { ArticleInfo } from '@/types/articles';
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

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

    return NextResponse.redirect(new URL(destination, req.url));
}