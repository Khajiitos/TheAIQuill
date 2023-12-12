'use client'
import Image from "next/image";
import { useState } from "react";

export default function CommentLikeButton(props: {commentLiked: boolean, articleId: number, commentId: number, likeCount: number}) {
    const [liked, setLiked] = useState<boolean>(props.commentLiked);
    const [likeCount, setLikeCount] = useState<number>(props.likeCount);

    function onClick() {
        fetch('/api/comment/like', {
            method: liked ? 'DELETE' : 'PUT',
            body: JSON.stringify({
                articleId: props.articleId,
                commentId: props.commentId
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
        <div className="flex items-center">
            <p className="m-0 mr-1 text-accent">{likeCount}</p>
            <Image className="cursor-pointer mb-1" src={liked ? "/img/icon-star-fill.svg" : "/img/icon-star.svg"} alt="Like button" width={24} height={24} onClick={onClick}></Image>
        </div>
    )
}