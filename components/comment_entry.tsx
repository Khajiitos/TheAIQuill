"use client";
import { CommentInfoWithLike } from "@/types/comments";
import Image from "next/image";
import CommentLikeButton from "./comment_like_button";

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
        <div>
            <p>{props.commentInfo.author}</p>
            <p>{props.commentInfo.content}</p>
            <div>
                <p title={timeZone}>{formattedDate}</p>
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
