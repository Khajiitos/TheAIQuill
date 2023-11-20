import { ArticleInfo } from '@/types/articles';
import { Pool, QueryFunction, QueryOptions } from 'mysql';
import { NextRequest } from 'next/server';
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

const regex = /[A-Za-z0-9\.\-]+/;

export async function POST(req: NextRequest) {
    const ipAddress = req.headers.get('x-forwarded-for') || (req.ip?.startsWith("::ffff:" ? req.ip.substring(7) : req.ip));
    console.log(ipAddress);
    const response: Array<{tag: string}> = await query(db, "SELECT tag FROM suggestion WHERE ip_address = ?", [ipAddress]) as Array<{tag: string}>;

    if (response.length != 0) {
        const tag = response[0].tag;

        return Response.json({
            error: "You already submitted a suggestion of tag: " + tag
        });
    }

    const json: {suggestion: string} = await req.json();

    if (json.suggestion) {
        if (regex.test(json.suggestion)) {
            await query(db, "INSERT INTO suggestion (ip_address, tag) VALUES (?, ?)", [ipAddress, json.suggestion]);

            return Response.json({
                message: "Success! You suggested tag: " + json.suggestion
            });
        } else {
            return Response.json({
                error: "Invalid tag!"
            });
        }
    } else {
        return Response.json({
            error: "Bad request"
        });
    }
}