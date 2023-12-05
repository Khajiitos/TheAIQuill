import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { ArticleInfo, PartialArticles } from '@/types/articles';

export async function PUT(req: NextRequest) {
    return Response.json("");
}

export async function DELETE(req: NextRequest) {
    return Response.json("");
}