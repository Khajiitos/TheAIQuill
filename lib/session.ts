import { IronSession, getIronSession } from 'iron-session';

export interface SessionData {
    loggedIn: boolean;
}

export async function getSessionData(cookies: any): Promise<IronSession<SessionData>> {
    return await getIronSession(cookies, {
        password: 'nuIjJaNi7QZRVCXepSPlMmHD2rcfLxwkF5A64Td8EoW13hgsOK',
        cookieName: "admin-session-cookie" 
    });
}