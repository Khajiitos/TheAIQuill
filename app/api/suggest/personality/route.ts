import { NextRequest } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
    let ipAddress: string | undefined = req.headers.get('x-forwarded-for') || req.ip;

    if (ipAddress?.startsWith('::ffff:')) {
      ipAddress = ipAddress.substring(7);
    }

    const response: Array<{personality: string}> = await query("SELECT personality.personality FROM suggestion_personality JOIN personality ON personality.id = suggestion_personality.personality_id WHERE suggestion_personality.ip_address = ?", [ipAddress]) as Array<{personality: string}> || [];

    if (response.length != 0) {
        const personality = response[0].personality;

        return Response.json({
            error: "You already submitted a suggestion for personality: " + personality
        });
    }

    const json: {personalityId: number} = await req.json();
    const personalityId = Number(json.personalityId);

    if (personalityId !== undefined) {
        // MySQL starts ids with 1
        const realPersonalityId = personalityId + 1;

        const response: Array<{personality: string}> = await query("SELECT personality FROM personality WHERE id = ?", [realPersonalityId]) as Array<{personality: string}> || [];

        if (response.length >= 1) {
            console.log('[' + new Date().toISOString() + '] ' + ipAddress + ' suggested personality: ' + response[0].personality);

            await query("INSERT INTO suggestion_personality (ip_address, personality_id) VALUES (?, ?)", [ipAddress, realPersonalityId]);
            return Response.json({
                message: "Success! You suggested personality: " + response[0].personality
            });
        } else {
            return Response.json({
                error: "Invalid personality"
            });
        }
    } else {
        return Response.json({
            error: "Bad request"
        });
    }
}