import { Pool, QueryFunction, QueryOptions } from 'mysql';
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

export const dynamic = 'force-dynamic';

export default async function SuggestionsPage() {
  interface TagAndCount {
    tag: string,
    tag_count: number
  }

  const response: Array<TagAndCount> = await query(db, "SELECT tag, COUNT(tag) AS tag_count FROM suggestion WHERE tag IS NOT NULL GROUP BY tag", []) as Array<TagAndCount>;
    
  let totalCount = 0;
  response.forEach(obj => totalCount += obj.tag_count);

  return (
    <main className="bg-green-600 mt-3 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Suggestions</h1>
        <p>This page contains a list of suggested tags.</p>

        {response.length === 0 ? <p className='text-red-400 mt-5 font-semibold'>But there are no suggested tags!</p> : <table className='mt-5 border-collapse border bg-green-700'>
          <thead>
          <tr>
            <th className='py-4 px-6 border'>Tag</th>
            <th className='py-4 px-6 border'>Chance</th>
          </tr>
          </thead>
          <tbody>
          {response.map(obj => (
            <tr key={obj.tag} className='border-t'>
              <td className='py-4 px-6 border'>{obj.tag}</td>
              <td className='py-4 px-6 border'>{((obj.tag_count / totalCount) * 100).toFixed(1)}%</td>
            </tr>
          ))}
          </tbody>
        </table>}
    </main>
  )
}
