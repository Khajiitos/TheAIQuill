import { ArticleInfo } from "@/types/articles";
import ArticleEntry from "./article_entry";

export default async function ArticleContainer(props: {articles: Array<ArticleInfo>}) {
	return (
        <div className="bg-green-700 text-white container-xl p-4 rounded">
            {props.articles.length === 0 ? <p>Empty!</p> : props.articles.map(articleInfo => (
                <ArticleEntry articleInfo={articleInfo}></ArticleEntry>
            ))}
        </div>
	);
}