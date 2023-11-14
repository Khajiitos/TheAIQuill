import { ScriptProps } from "next/script";
import styles from "./nav.module.css";
import Image from 'next/image'
import { ArticleInfo } from "@/types/articles";
import { parse } from 'marked'

export interface ArticleProp {
    articleData: ArticleInfo | null;
}

export default async function Article(props : ArticleProp) {
    const innerHTML = props.articleData != null ? parse(props.articleData.article_content) : "";
	return (
            <article className="bg-slate-700 w-3/5 h-screen m-0 p-10 text-white">
                {<p className="text-2xl font-semibold mb-7">{props.articleData?.article_header || <span className="text-red-500">Article doesn't exist</span>}</p>}
                <section dangerouslySetInnerHTML={{__html: innerHTML}}></section>
            </article>
	);
}