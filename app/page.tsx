import ArticleContainer from "@/components/article_container";

export const dynamic = "force-dynamic";

export default async function Home() {
    return (
        <main>
            <h3>Latest articles</h3>

            <div>
                <ArticleContainer></ArticleContainer>
            </div>
        </main>
    );
}
