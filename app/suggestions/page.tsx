import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function SuggestionsPage() {
  interface TagAndCount {
    tag: string,
    tag_count: number
  }

  interface PersonalityAndCount {
    personality: string,
    personality_count: number
  }

  const suggestionResponse: TagAndCount[] = await query("SELECT tag, COUNT(tag) AS tag_count FROM suggestion WHERE tag IS NOT NULL GROUP BY tag", []) as Array<TagAndCount> || [];
    
  let totalCount = 0;
  suggestionResponse.forEach(obj => totalCount += obj.tag_count);

  const suggestionPersonalityResponse: PersonalityAndCount[] = await query("SELECT personality.personality, COUNT(personality.personality) AS personality_count FROM suggestion_personality JOIN personality ON personality.id = suggestion_personality.personality_id GROUP BY personality", []) as Array<PersonalityAndCount> || [];
  
  let totalPersonalityCount = 0;
  suggestionPersonalityResponse.forEach(obj => totalPersonalityCount += obj.personality_count);

  return (
    <main className="mt-3 text-text p-8">
        <h1 className="text-3xl font-bold mb-6">Suggestions</h1>
        <p>This page contains a list of suggested tags or personalities.</p>

        {suggestionResponse.length === 0 ? <p className='text-red-400 mt-5 font-semibold'>No suggested tags!</p> : <table className='mt-5 border-collapse border bg-green-700'>
          <thead>
          <tr>
            <th className='py-4 px-6 border'>Tag</th>
            <th className='py-4 px-6 border'>Chance</th>
          </tr>
          </thead>
          <tbody>
          {suggestionResponse.map(obj => (
            <tr key={obj.tag} className='border-t'>
              <td className='py-4 px-6 border'>{obj.tag}</td>
              <td className='py-4 px-6 border'>{((obj.tag_count / totalCount) * 100).toFixed(1)}%</td>
            </tr>
          ))}
          </tbody>
        </table>}

        {suggestionPersonalityResponse.length === 0 ? <p className='text-red-400 mt-5 font-semibold'>No suggested personalities!</p> : <table className='mt-5 border-collapse border bg-green-700'>
          <thead>
          <tr>
            <th className='py-4 px-6 border'>Personality</th>
            <th className='py-4 px-6 border'>Chance</th>
          </tr>
          </thead>
          <tbody>
          {suggestionPersonalityResponse.map(obj => (
            <tr key={obj.personality} className='border-t'>
              <td className='py-4 px-6 border'>{obj.personality}</td>
              <td className='py-4 px-6 border'>{((obj.personality_count / totalPersonalityCount) * 100).toFixed(1)}%</td>
            </tr>
          ))}
          </tbody>
        </table>}
    </main>
  )
}
