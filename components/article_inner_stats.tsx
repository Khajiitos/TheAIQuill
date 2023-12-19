'use client'

import Image from "next/image"

export default function ArticleInnerStats(props: {minutesOfReading: number, likeCount: number, commentCount: number, creationDate: Date}) {
    const formattedDate = props.creationDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        hour12: false,
    });

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return (<aside>
        <div className="bg-entry p-2 pl-4 pr-4 mt-6 mb-4 flex items-center justify-between rounded-xl">
        <p className="text-accent m-0" title={timeZone}>{formattedDate}</p>
        <div className="flex">
        <p className="text-accent mr-3">
                {props.likeCount}
                <Image className="inline ml-1 colored-svg" src="/img/icon-star-fill.svg" alt="Star icon" width={16} height={16}></Image>
            </p>
            <p className="text-accent mr-3">
                {props.commentCount}
                <Image className="inline ml-1 colored-svg" src="/img/icon-comment.svg" alt="Comment icon" width={16} height={16}></Image>
            </p>
            <p className="text-accent mr-3">
                {props.minutesOfReading} min
                <Image className="inline ml-1 colored-svg" src="/img/icon-time.svg" alt="Time icon" width={16} height={16}></Image>
            </p>
        </div>
        </div>
    </aside>)
}