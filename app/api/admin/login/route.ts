import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSessionData } from '@/lib/session';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const password = formData.get('password');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
    if (password === adminPassword) {
        const sessionData = await getSessionData(req.cookies);
        sessionData.loggedIn = true;
        sessionData.save();
        return Response.redirect(new URL('/admin', req.url));
    } else {
        return Response.redirect(new URL('/admin', req.url));
    }
}