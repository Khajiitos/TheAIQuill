import ArticleContainer from '@/components/article_container';

import { cookies } from 'next/headers';
import { getSessionData } from '@/lib/session';
import { redirect } from '@/node_modules/next/navigation';

export default async function AdminPage() {
    const session = await getSessionData(cookies());
    
    if (!session.loggedIn) {
        return redirect('/admin/login');
    }

    return (
        <main className="">
        <h3 className='text-center font-semibold text-4xl m-5 text-white'>Latest articles</h3>

        <div className='flex justify-center content-center flex-row container-none overflow-hidden'>
        </div>
        </main>
  );
}
