'use client'
import { ArticleInfo, ArticleInfoWithLike } from "@/types/articles";
import Image from "next/image";
import { useState } from "react";

export default function LikeButton(props: {articleInfo: ArticleInfoWithLike, onChanged: (liked: boolean) => void}) {
    const [liked, setLiked] = useState<boolean>(props.articleInfo.liked);

    function onClick(e: MouseEvent) {
        fetch('/api/like', {
            method: props.articleInfo.liked ? 'DELETE' : 'PUT',
            body: JSON.stringify({
                articleId: props.articleInfo.article_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        props.articleInfo.liked = !props.articleInfo.liked;
        setLiked(props.articleInfo.liked);
        props.onChanged(props.articleInfo.liked);
    }

    return (
        <Image className="cursor-pointer" title={liked ? "Click to remove like" : "Click to add like"} src={liked ? "/img/like_full_liked.svg" : "/img/like_full.svg"} alt="Like" width={96} height={96} onClick={onClick}></Image>
    )
}