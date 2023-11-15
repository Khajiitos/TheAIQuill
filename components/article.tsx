import { ScriptProps } from "next/script";
import Image from 'next/image'
import { ArticleInfo } from "@/types/articles";
import { parse } from 'marked'

export interface ArticleProp {
    articleData: ArticleInfo | null;
}

export default async function Article(props : ArticleProp) {
    const innerHTML = props.articleData != null ? parse(props.articleData.article_content) : "";
	return (
            <article className="bg-green-800 container-none max-w-7xl min-h-screen m-0 p-10 text-white rounded-sm">
                {<p className="text-2xl font-semibold mb-7">{props.articleData?.article_header || <span className="text-red-500">Article doesn&apos;t exist</span>}</p>}
                <section dangerouslySetInnerHTML={{__html: innerHTML}}></section>
            </article>
	);
}