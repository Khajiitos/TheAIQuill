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
        <h1 className="text-3xl font-bold mb-6 text-center">Suggestions</h1>

        <div className='bg-background-lighter w-full pt-3 pb-3 mb-3 rounded-xl'>
          <p className='text-2xl text-center'>Tag</p>

          {suggestionResponse.length === 0 ?
          <p className='text-primary text-center m-3'>No suggested tags!</p>
          :
          <>
          {suggestionResponse.map(obj => (
            <div key={obj.tag} className='flex odd:flex-row-reverse p-3 rounded-xl'>
              <div className='bg-secondary p-4 rounded-xl m-2 shadow-2xl w-full text-sm'>{obj.tag}</div>
              <div className='bg-accent p-4 rounded-xl m-2 shadow-2xl text-sm'>{((obj.tag_count / totalCount) * 100).toFixed(1)}%</div>
            </div>
          ))}
          </>
          }
        </div>

        <div className='bg-background-lighter w-full pt-3 pb-3 mt-3 rounded-xl'>
          <p className='text-2xl text-center'>Personality</p>

          {suggestionResponse.length === 0 ?
          <p className='text-primary text-center m-3'>No suggested personalities!</p>
          :
          <>
          {suggestionPersonalityResponse.map(obj => (
            <div key={obj.personality} className='flex odd:flex-row-reverse p-3 rounded-xl'>
              <div className='bg-secondary p-4 rounded-xl m-2 shadow-2xl w-full text-sm'>{obj.personality}</div>
              <div className='bg-accent p-4 rounded-xl m-2 shadow-2xl text-sm'>{((obj.personality_count / totalPersonalityCount) * 100).toFixed(1)}%</div>
            </div>
          ))}
          </>
          }
        </div>
    </main>
  )
}
