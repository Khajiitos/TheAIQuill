import { ArticleInfo, ArticleInfoWithLike } from "@/types/articles";
import { parse } from 'marked'
import Image from "next/image";
import LikeButton from "./like_button";
import CommentSection from "./comment_section";
import ArticleInnerStats from "./article_inner_stats";

export default async function Article(props: {articleInfo: ArticleInfoWithLike | null}) {

    const wordCount: number = props.articleInfo ? props.articleInfo.article_content.split(" ").length : 0;
    const minutesOfReading: number = Math.ceil(wordCount / 230);
            
    const likeCount = props.articleInfo ? props.articleInfo.like_count : 0;
    const commentCount = props.articleInfo ? props.articleInfo.comment_count : 0;

    const innerHTML = props.articleInfo != null ? parse(props.articleInfo.article_content) : "";
	return (
            <article className="container-none max-w-7xl min-h-screen m-0 p-10 text-text">
                <header>
                {<h1 className="font-semibold text-center text-4xl mb-12">{props.articleInfo?.article_header || <span className="text-red-500">Article doesn&apos;t exist</span>}</h1>}
                {props.articleInfo && 
                    <ArticleInnerStats minutesOfReading={minutesOfReading} likeCount={likeCount} commentCount={commentCount} creationDate={props.articleInfo.creation_date}></ArticleInnerStats>
                }
                </header>
                <section dangerouslySetInnerHTML={{__html: innerHTML}}></section>

                {props.articleInfo && <aside className="flex justify-center mt-10">
                    <LikeButton articleId={props.articleInfo.article_id} articleLiked={props.articleInfo.liked} likeCount={props.articleInfo.like_count}></LikeButton>
                </aside>}
                {props.articleInfo && <CommentSection articleId={props.articleInfo.article_id}></CommentSection>}
            </article>
	);
}