'use client'
import { CommentInfo } from "@/types/comments";

export default function CommentEntry(props: {commentInfo: CommentInfo}) {
      
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
            </div>
        </div>
	);
}