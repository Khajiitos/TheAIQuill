'use client'
import Image from "next/image";
import { useState } from "react";

export default function LikeButton(props: {articleLiked: boolean, articleId: number, likeCount: number}) {
    const [liked, setLiked] = useState<boolean>(props.articleLiked);
    const [likeCount, setLikeCount] = useState<number>(props.likeCount);

    function onClick() {
        fetch('/api/like', {
            method: liked ? 'DELETE' : 'PUT',
            body: JSON.stringify({
                articleId: props.articleId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // not inversed yet
        if (liked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }

        setLiked(!liked);
    }

    return (
        <div title={liked ? "Click to remove like" : "Click to add like"} className="cursor-pointer flex bg-green-700 hover:bg-green-600 rounded-lg p-2" onClick={onClick}>
            <Image src={liked ? "/img/like_full_liked.svg" : "/img/like_full.svg"} alt="Like" width={48} height={48}></Image>
            <p className="pl-3 pr-1 select-none font-sans font-bold">{likeCount}</p>
        </div>
    )
}