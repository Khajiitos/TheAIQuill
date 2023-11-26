import Link from "next/link";
import { ArticleInfo } from "@/types/articles";
import Image from "next/image";

export default async function ArticleEntry(props: {articleInfo: ArticleInfo}) {
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
      
	return (
        <Link href={'article/' + props.articleInfo.slug}>
            <div className="bg-green-600 hover:bg-green-500 text-white container-lg rounded m-4 p-3 transition-colors">
                <p className="text-lg font-semibold">{props.articleInfo.article_header}</p>
                <p className="text-gray-300 text-sm">{props.articleInfo.article_description}</p>
                <p className="mt-2 text-gray-300 text-sm"><Image src="/img/clock_gray.svg" width={16} height={16} className="inline mr-2" alt="Reading time"></Image>{minutesOfReading} min read | {formattedDate}</p>
            </div>
        </Link>
	);
}