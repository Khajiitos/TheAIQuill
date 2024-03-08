"use client";

import Image from "next/image";

export default function ArticleInnerStats(props: {
    minutesOfReading: number;
    likeCount: number;
    commentCount: number;
    creationDate: Date;
}) {
    const formattedDate = props.creationDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        hour12: false,
    });

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <aside>
            <div>
                <p title={timeZone}>{formattedDate}</p>
                <div>
                    <p>
                        {props.likeCount}
                        <Image
                            src="/img/icon-star-fill.svg"
                            alt="Star icon"
                            width={16}
                            height={16}
                        ></Image>
                    </p>
                    <p>
                        {props.commentCount}
                        <Image
                            src="/img/icon-comment.svg"
                            alt="Comment icon"
                            width={16}
                            height={16}
                        ></Image>
                    </p>
                    <p>
                        {props.minutesOfReading} min
                        <Image
                            src="/img/icon-time.svg"
                            alt="Time icon"
                            width={16}
                            height={16}
                        ></Image>
                    </p>
                </div>
            </div>
        </aside>
    );
}
