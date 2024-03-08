"use client";
import Image from "next/image";
import { useState } from "react";

export default function CommentLikeButton(props: {
    commentLiked: boolean;
    articleId: number;
    commentId: number;
    likeCount: number;
}) {
    const [liked, setLiked] = useState<boolean>(props.commentLiked);
    const [likeCount, setLikeCount] = useState<number>(props.likeCount);

    function onClick() {
        fetch("/api/comment/like", {
            method: liked ? "DELETE" : "PUT",
            body: JSON.stringify({
                articleId: props.articleId,
                commentId: props.commentId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
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
        <div>
            <p>{likeCount}</p>
            <Image
                src={liked ? "/img/icon-star-fill.svg" : "/img/icon-star.svg"}
                alt="Like button"
                width={24}
                height={24}
                onClick={onClick}
            ></Image>
        </div>
    );
}
