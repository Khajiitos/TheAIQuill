"use client";
import { useState } from "react";
import styles from "./like_button.module.css";

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
        <section className={styles.likeSection}>
            <p>
                Did you like this article?
                <br />
                Rate it by leaving a like!
            </p>

            <div className={styles.likeContainer}>
                <button
                    className={`${styles.like} ${liked ? styles.liked : ""}`}
                    onClick={onClick}
                ></button>
                <span>{likeCount}</span>
            </div>
        </section>
    );
}
