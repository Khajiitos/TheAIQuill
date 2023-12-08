import { NextRequest } from 'next/server';
import { query } from '@/lib/db';

const regex = /^[A-Za-z0-9 .:-]{3,64}$/;

export async function POST(req: NextRequest) {
    
}