import { NextRequest } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(req: NextRequest) {
    let ipAddress: string | undefined = req.headers.get('x-forwarded-for') || req.ip;

    if (ipAddress?.startsWith('::ffff:')) {
      ipAddress = ipAddress.substring(7);
    }

    const json: {articleId: number, commentId: number} = await req.json();

    const likeFromIP: any[] = await query('SELECT * FROM `comment_like` WHERE ip_address = ? AND comment_id = ?', [ipAddress, json.commentId]) as any[];

    if (likeFromIP.length === 0) {
        await query('INSERT INTO `comment_like` (ip_address, comment_id) VALUES (?, ?)', [ipAddress, json.commentId]);
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

    const json: {articleId: number, commentId: number} = await req.json();

    await query('DELETE FROM `comment_like` WHERE ip_address = ? AND comment_id = ?', [ipAddress, json.commentId]);

    return Response.json({
        result: "ok"
    });
}