import ArticleContainer from "@/components/article_container";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function Home() {
    return (
        <main className={styles.main}>
            <h1>Latest articles</h1>

            <ArticleContainer></ArticleContainer>
        </main>
    );
}
