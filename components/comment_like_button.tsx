"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./comment_like_button.module.css";

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
        <div className={styles.likeContainer}>
            <span>{likeCount}</span>
            <button
                className={`${styles.like} ${liked ? styles.liked : ""}`}
                onClick={onClick}
            ></button>
        </div>
    );
}
