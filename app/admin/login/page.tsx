import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

async function getIronSessionData() {
  const session = await getIronSession(cookies(), { password: "...", cookieName: "..." });
}

export default async function AdminLoginPage() {

    function onSubmit() {

    }

    return (
      <main>
        <h3 className='text-center font-semibold text-4xl m-5 text-white'>Login</h3>
        <div className='flex justify-center content-center flex-row'>
            <form action='/api/admin/login' method='POST'>
                <input className="p-2 rounded-lg border border-gray-500" type="text"/>
                <div className='flex justify-center content-center flex-row container-none overflow-hidden'>
                <button className='p-3 bg-green-700 rounded-lg text-white mt-5 w-44' type="submit">Login</button>
                </div>
            </form>
        </div>
      </main>
    )
  }
  