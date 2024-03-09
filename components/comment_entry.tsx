"use client";
import { CommentInfoWithLike } from "@/types/comments";
import CommentLikeButton from "./comment_like_button";
import styles from "./comment_entry.module.css";

export default function CommentEntry(props: {
    commentInfo: CommentInfoWithLike;
    articleId: number;
}) {
    const formattedDate = props.commentInfo.comment_date.toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
            hour12: false,
        }
    );

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className={styles.comment}>
            <small className={styles.author}>{props.commentInfo.author}</small>
            <p className={styles.content}>{props.commentInfo.content}</p>
            <div className={styles.stats}>
                <small title={timeZone}>{formattedDate}</small>
                <CommentLikeButton
                    commentId={props.commentInfo.id}
                    commentLiked={props.commentInfo.comment_liked}
                    likeCount={props.commentInfo.like_count}
                    articleId={props.articleId}
                ></CommentLikeButton>
            </div>
        </div>
    );
}
