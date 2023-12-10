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
        <div className="flex bg-entry rounded-lg p-2 w-full justify-between">
            <p className="pl-3 pr-1 select-none">Did you like this article?<br/>Rate it by leaving a like!</p>

            <div className="pr-3">
                <Image className="cursor-pointer mt-2" src={liked ? "/img/icon-star-fill.svg" : "/img/icon-star.svg"} alt="Like button" width={32} height={32} onClick={onClick}></Image>
                <p className="text-center m-1">{likeCount}</p>
            </div>
        </div>
    )
}