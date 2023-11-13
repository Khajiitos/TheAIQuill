import Link from "next/link";
import { ArticleInfo } from "@/types/articles";

export default async function ArticleEntry(props: {articleInfo: ArticleInfo}) {
	return (
        <Link href={'article/' + props.articleInfo.slug}>
            <div className="bg-green-600 hover:bg-green-500 text-white container-lg rounded m-4 p-3 transition-colors">
                <p className="text-lg font-semibold">{props.articleInfo.article_header}</p>
                <p className="text-gray-300 text-sm">{props.articleInfo.article_description}</p>
                <p className="mt-2 text-gray-300 text-sm"><img src="img/clock_gray.svg" width="16px" className="inline mr-2"></img>3 min read | {props.articleInfo.creation_date.toISOString()}</p>
            </div>
        </Link>
	);
}