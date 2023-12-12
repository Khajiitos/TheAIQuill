'use client'
import { CommentInfoWithLike } from "@/types/comments";
import Image from "next/image";
import CommentLikeButton from "./comment_like_button";

export default function CommentEntry(props: {commentInfo: CommentInfoWithLike, articleId: number}) {
      
    const formattedDate = props.commentInfo.comment_date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        hour12: false,
    });

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
	return (
        <div className="bg-background-lighter text-text rounded-lg shadow-xl mt-5 p-3 transition-colors">
            <p className="text-lg font-semibold m-0">{props.commentInfo.author}</p>
            <p className="text-text text-sm mt-2">{props.commentInfo.content}</p>
            <div className="flex justify-between m-0">
                <p className="text-sm m-0 text-accent" title={timeZone}>{formattedDate}</p>
                <div>
                    <p className="text-accent mr-3 text-sm">
                        <CommentLikeButton commentId={props.commentInfo.id} commentLiked={props.commentInfo.comment_liked} likeCount={props.commentInfo.like_count} articleId={props.articleId}></CommentLikeButton>
                    </p>
                </div>
            </div>
        </div>
	);
}