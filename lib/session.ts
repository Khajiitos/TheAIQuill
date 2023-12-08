import { getIronSession } from 'iron-session';

export async function getSessionData(cookies: any) {
    return await getIronSession(cookies, { password: process.env.ADMIN_PASSWORD || 'admin', cookieName: "admin-session-cookie" });
}