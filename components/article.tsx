import { ArticleInfo, ArticleInfoWithLike } from "@/types/articles";
import { parse } from 'marked'
import Image from "next/image";
import LikeButton from "./like_button";

export default async function Article(props: {articleInfo: ArticleInfoWithLike | null}) {

    const innerHTML = props.articleInfo != null ? parse(props.articleInfo.article_content) : "";
	return (
            <article className="font-serif bg-green-800 container-none max-w-7xl min-h-screen m-0 p-10 text-white rounded-sm border-4 border-green-900">
                <header>
                {<h1 className="font-semibold">{props.articleInfo?.article_header || <span className="text-red-500">Article doesn&apos;t exist</span>}</h1>}
                {props.articleInfo && <aside><p className="text-gray-300 text-sm mb-7">{props.articleInfo.creation_date.toDateString()}</p></aside>}
                </header>
                <section dangerouslySetInnerHTML={{__html: innerHTML}}></section>

                {props.articleInfo && <aside className="flex justify-center mt-10">
                    <LikeButton articleId={props.articleInfo.article_id} articleLiked={props.articleInfo.liked} likeCount={props.articleInfo.like_count}></LikeButton>
                </aside>}
            </article>
	);
}