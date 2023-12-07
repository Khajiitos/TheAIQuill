import { NextRequest } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(req: NextRequest) {
    let ipAddress: string | undefined = req.headers.get('x-forwarded-for') || req.ip;

    if (ipAddress?.startsWith('::ffff:')) {
      ipAddress = ipAddress.substring(7);
    }

    const json: {articleId: number} = await req.json();

    const likeFromIP: any[] = await query('SELECT * FROM `like` WHERE ip_address = ? AND article_id = ?', [ipAddress, json.articleId]) as any[];

    if (likeFromIP.length === 0) {
        await query('INSERT INTO `like` (ip_address, article_id) VALUES (?, ?)', [ipAddress, json.articleId]);
    }

    return Response.json({
        result: "ok"
    });
}

export async function DELETE(req: NextRequest) {
    let ipAddress: string | undefined = req.headers.get('x-forwarded-for') || req.ip;

    if (ipAddress?.startsWith('::ffff:')) {
      ipAddress = ipAddress.substring(7);
    }

    const json: {articleId: number} = await req.json();

    await query('DELETE FROM `like` WHERE ip_address = ? AND article_id = ?', [ipAddress, json.articleId]);

    return Response.json({
        result: "ok"
    });
}