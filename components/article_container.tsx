'use client'
import { ArticleInfo, PartialArticles } from "@/types/articles";
import { useEffect, useState } from "react";
import ArticleEntry from "./article_entry";

async function seeMore(minId: number): Promise<PartialArticles> {
    const articles = await (await fetch('/api/articles?minId=' + minId)).json() as PartialArticles;
    articles.articles.map(e => e.creation_date = new Date(e.creation_date));
    return articles;
}

export default function ArticleContainer() {  
    const [articles, setArticles] = useState<ArticleInfo[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);

    async function onBottomDiscovered() {
        if (waitingForResponse) {
            return;
        }

        let minId: number = -1;
        for (const article of articles) {
            if (minId == -1 || article.article_id < minId) {
                minId = article.article_id;
            }
        }

        setWaitingForResponse(true);
        const partialArticles: PartialArticles = await seeMore(minId);
        setArticles([...articles, ...partialArticles.articles]);
        setHasMore(partialArticles.hasMore);
        setWaitingForResponse(false);
    }

    function isInViewport(element: HTMLElement) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkIfDiscovered() {
        const loadingParagraph = document.getElementById('loading-paragraph');

        if (loadingParagraph && isInViewport(loadingParagraph)) {
            onBottomDiscovered();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', checkIfDiscovered);
        window.addEventListener('load', checkIfDiscovered);

        return () => {
            window.removeEventListener('scroll', checkIfDiscovered);
            window.removeEventListener('load', checkIfDiscovered);
        }
    });

	return (
        <div className="bg-green-700 text-white container-xl p-4 rounded">
            {articles.length === 0 && !hasMore ? <p>Empty!</p> : articles.map(articleInfo => (
                <ArticleEntry key={articleInfo.slug} articleInfo={articleInfo}></ArticleEntry>
            ))}
            {hasMore && <p id="loading-paragraph" className="text-gray-300">Loading...</p>}
        </div>
	);
}