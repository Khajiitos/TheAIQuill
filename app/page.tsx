import ArticleContainer from '@/components/article_container';
import { ArticleInfo } from '@/types/articles';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {  
  return (
    <main className="">
      <h3 className='text-center font-semibold text-4xl m-5 text-white'>Latest articles</h3>

      <div className='flex justify-center content-center flex-row container-none overflow-hidden'>
        <ArticleContainer></ArticleContainer>
      </div>
    </main>
  )
}
