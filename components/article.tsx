import { ArticleInfo, ArticleInfoWithLike } from "@/types/articles";
import { parse } from 'marked'
import Image from "next/image";
import LikeButton from "./like_button";
import CommentSection from "./comment_section";

export default async function Article(props: {articleInfo: ArticleInfoWithLike | null}) {

    const wordCount: number = props.articleInfo ? props.articleInfo.article_content.split(" ").length : 0;
    const minutesOfReading: number = Math.ceil(wordCount / 230);
      
    const formattedDate = props.articleInfo ? props.articleInfo.creation_date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        hour12: false,
    }) : '';

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
    const likeCount = props.articleInfo ? props.articleInfo.like_count : 0;
    const commentCount = props.articleInfo ? props.articleInfo.comment_count : 0;

    const innerHTML = props.articleInfo != null ? parse(props.articleInfo.article_content) : "";
	return (
            <article className="container-none max-w-7xl min-h-screen m-0 p-10 text-text">
                <header>
                {<h1 className="font-semibold text-center text-4xl mb-12">{props.articleInfo?.article_header || <span className="text-red-500">Article doesn&apos;t exist</span>}</h1>}
                {props.articleInfo && 
                <aside>
                    <div className="bg-entry p-2 pl-4 pr-4 mt-6 mb-4 flex items-center justify-between rounded-xl">
                    <p className="text-accent m-0" title={timeZone}>{formattedDate}</p>
                    <div className="flex">
                    <p className="text-accent mr-3">
                            {likeCount}
                            <Image className="inline ml-1" src="/img/icon-star-fill.svg" alt="Star icon" width={16} height={16}></Image>
                        </p>
                        <p className="text-accent mr-3">
                            {commentCount}
                            <Image className="inline ml-1" src="/img/icon-comment.svg" alt="Comment icon" width={16} height={16}></Image>
                        </p>
                        <p className="text-accent mr-3">
                            {minutesOfReading} min
                            <Image className="inline ml-1" src="/img/icon-time.svg" alt="Time icon" width={16} height={16}></Image>
                        </p>
                    </div>
                    </div>
                </aside>
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