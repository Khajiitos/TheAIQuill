import { NextRequest } from 'next/server';
import { query } from '@/lib/db';

const regex = /^[A-Za-z0-9 .:-]+$/;

export async function GET(req: NextRequest) {
    console.log(req.body);
}