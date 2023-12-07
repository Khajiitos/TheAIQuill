'use client'
import { ArticleInfo, ArticleInfoWithLike, PartialArticles } from "@/types/articles";
import { useEffect, useState } from "react";
import ArticleEntry from "./article_entry";
import SearchBar from "./search_bar";

export default function ArticleContainer() {  
    const [articles, setArticles] = useState<ArticleInfoWithLike[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
    const [searchPhrase, setSearchPhrase] = useState<string>("");

    async function seeMore(minId: number): Promise<PartialArticles> {
        const articles = await (await fetch('/api/articles?minId=' + minId + (searchPhrase ? '&searchPhrase=' + searchPhrase : ''))).json() as PartialArticles;
        articles.articles.map(e => e.creation_date = new Date(e.creation_date));
        return articles;
    }

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
        setArticles([...articles, ...partialArticles.articles].sort((a, b) => b.creation_date.getTime() - a.creation_date.getTime()));
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
        checkIfDiscovered();
        window.addEventListener('scroll', checkIfDiscovered);
        window.addEventListener('resize', checkIfDiscovered);

        return () => {
            window.removeEventListener('scroll', checkIfDiscovered);
            window.removeEventListener('resize', checkIfDiscovered);
        }
    });

	return (
        <div className="bg-green-700 text-white container p-4 rounded">
            <div className="flex justify-center mb-3">
                <SearchBar onUpdate={(phrase) => {
                    setSearchPhrase(phrase);
                    setArticles(articles.sort((a, b) => b.creation_date.getTime() - a.creation_date.getTime()));
                    setHasMore(true);
                    checkIfDiscovered();
                }}></SearchBar>
            </div>
            {articles.length === 0 && !hasMore ? <p>Empty!</p> : articles.map(articleInfo => (
                ((articleInfo.article_header.toLowerCase().includes(searchPhrase.toLowerCase()) || articleInfo.article_description.toLowerCase().includes(searchPhrase.toLowerCase())) && <ArticleEntry key={articleInfo.slug + '-' + articleInfo.article_id} articleInfo={articleInfo}></ArticleEntry>)
            ))}
            {hasMore ? <p id="loading-paragraph" className="text-gray-300 text-center">Loading...</p> : <p className="text-gray-300 text-center">That&apos;s everything!</p>}
        </div>
	);
}