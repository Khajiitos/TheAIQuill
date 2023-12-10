import Link from "next/link";
import { ArticleInfo, ArticleInfoWithLike } from "@/types/articles";
import Image from "next/image";

export default function ArticleEntry(props: {articleInfo: ArticleInfoWithLike}) {
    const wordCount: number = props.articleInfo.article_content.split(" ").length;
    const minutesOfReading: number = Math.ceil(wordCount / 230);
      
    const formattedDate = props.articleInfo.creation_date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        hour12: false,
    });

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
    const likeCount = props.articleInfo.like_count;

	return (
        <Link href={'article/' + props.articleInfo.slug}>
            <div className="bg-entry hover:bg-entry-hover text-text container-lg rounded-t-xl m-4 p-4 transition-colors border-b-2 border-accent">
                <p className="text-2xl font-semibold mb-2">{props.articleInfo.article_header}</p>
                <p className="text-gray-300 text-sm">{props.articleInfo.article_description}</p>
                <div className="flex mt-2 justify-between">
                    <p className="text-accent">{minutesOfReading} min read</p>
                    <p className="text-accent">{likeCount + (likeCount === 1 ? ' like' : ' likes')}</p>
                    <p className="text-accent" title={timeZone}>{formattedDate}</p>
                </div>
            </div>
        </Link>
	);
}