import { NextRequest } from 'next/server';
import { query } from '@/lib/db';

const regex = /^.{4,100}$/;

export async function POST(req: NextRequest) {
    let ipAddress: string | undefined = req.headers.get('x-forwarded-for') || req.ip;

    if (ipAddress?.startsWith('::ffff:')) {
      ipAddress = ipAddress.substring(7);
    }

    const response: Array<{tag: string}> = await query("SELECT tag FROM suggestion WHERE ip_address = ?", [ipAddress]) as Array<{tag: string}> || [];

    if (response.length != 0) {
        const tag = response[0].tag;

        return Response.json({
            error: "You already submitted a suggestion of tag: " + tag
        });
    }

    const json: {suggestion: string} = await req.json();

    if (json.suggestion) {
        json.suggestion = json.suggestion.replaceAll("\"", "'");

        if (regex.test(json.suggestion)) {
            console.log('[' + new Date().toISOString() + '] ' + ipAddress + ' suggested: ' + json.suggestion);

            await query("INSERT INTO suggestion (ip_address, tag) VALUES (?, ?)", [ipAddress, json.suggestion]);

            return Response.json({
                message: "Success! You suggested tag: " + json.suggestion
            });
        } else {
            console.log(ipAddress + ' tried to suggest invalid tag: ' + json.suggestion);
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