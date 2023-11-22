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

  const response: Array<TagAndCount> = await query(db, "SELECT tag, COUNT(tag) AS tag_count FROM suggestion", []) as Array<TagAndCount>;

  let totalCount = 0;
  response.forEach(obj => totalCount += obj.tag_count);

  console.log(response);

  return (
    <main className="bg-green-600 mt-3 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Suggestions</h1>
        <p>This page contains a list of suggested tags</p>

        <table className='mt-5 [&>*]:border border-collapse rounded table-auto'>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Chance</th>
            </tr>
          </thead>
          <tbody>
            {response.map(obj => (
              <tr key={obj.tag}>
                <td>{obj.tag}</td>
                <td>{((obj.tag_count / totalCount) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
    </main>
  )
}
