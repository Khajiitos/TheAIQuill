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
        <div className="bg-green-600 text-white container-lg rounded mt-5 p-3 transition-colors">
            <div className="flex">
            <p className="text-lg font-semibold">{props.commentInfo.author}</p>
            <p className="text-sm ml-8 mt-1 text-gray-300" title={timeZone}>{formattedDate}</p>
            </div>
            <p className="text-gray-200 text-sm mt-3">{props.commentInfo.content}</p>
        </div>
	);
}