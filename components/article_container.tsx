'use client'
import { ArticleInfo, PartialArticles } from "@/types/articles";
import { useEffect, useState } from "react";
import ArticleEntry from "./article_entry";

async function seeMore(maxId: number): Promise<PartialArticles> {
    const articles = await (await fetch('/api/articles?maxId=' + maxId)).json();
    return articles;
}

export default function ArticleContainer() {  
    const [articles, setArticles] = useState<ArticleInfo[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    async function onBottomDiscovered() {
        let maxId: number = 0;
        for (const article of articles) {
            if (article.article_id > maxId) {
                maxId = article.article_id;
            }
        }

        const partialArticles: PartialArticles = await seeMore(maxId);
        setArticles([...articles, ...partialArticles.articles]);
        setHasMore(partialArticles.hasMore);
    }

    function checkIfDiscovered() {
        const loadingParagraph = document.getElementById('loading-paragraph');

        if (loadingParagraph) {
            if (loadingParagraph.offsetWidth ||  
                loadingParagraph.offsetHeight ||  
                loadingParagraph.getClientRects().length) {

            }
        }
    }

	return (
        <div className="bg-green-700 text-white container-xl p-4 rounded">
            {articles.length === 0 && !hasMore ? <p>Empty!</p> : articles.map(articleInfo => (
                <ArticleEntry key={articleInfo.slug} articleInfo={articleInfo}></ArticleEntry>
            ))}
            {hasMore && <p id="loading-paragraph" className="text-gray-300">Loading...</p>}
        </div>
	);
}