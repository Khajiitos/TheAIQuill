"use client";
import Image from "next/image";
import { useState } from "react";

export default function LikeButton(props: {
    articleLiked: boolean;
    articleId: number;
    likeCount: number;
}) {
    const [liked, setLiked] = useState<boolean>(props.articleLiked);
    const [likeCount, setLikeCount] = useState<number>(props.likeCount);

    function onClick() {
        fetch("/api/like", {
            method: liked ? "DELETE" : "PUT",
            body: JSON.stringify({
                articleId: props.articleId,
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
            <p>
                Did you like this article?
                <br />
                Rate it by leaving a like!
            </p>

            <div>
                <Image
                    src={
                        liked ? "/img/icon-star-fill.svg" : "/img/icon-star.svg"
                    }
                    alt="Like button"
                    width={32}
                    height={32}
                    onClick={onClick}
                ></Image>
                <p>{likeCount}</p>
            </div>
        </div>
    );
}
