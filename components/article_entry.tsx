import Link from "next/link";
import { ArticleInfo, ArticleInfoWithLike } from "@/types/articles";
import Image from "next/image";

export default function ArticleEntry(props: {
    articleInfo: ArticleInfoWithLike;
}) {
    const wordCount: number =
        props.articleInfo.article_content.split(" ").length;
    const minutesOfReading: number = Math.ceil(wordCount / 230);

    const formattedDate = props.articleInfo.creation_date.toLocaleDateString(
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

    const likeCount = props.articleInfo.like_count;
    const commentCount = props.articleInfo.comment_count;

    return (
        <Link href={"article/" + props.articleInfo.slug}>
            <div>
                <p>{props.articleInfo.article_header}</p>
                <p>{props.articleInfo.article_description}</p>
                <div>
                    <div>
                        <p>
                            {likeCount}
                            <Image
                                src="/img/icon-star-fill.svg"
                                alt="Star icon"
                                width={16}
                                height={16}
                            ></Image>
                        </p>
                        <p>
                            {commentCount}
                            <Image
                                src="/img/icon-comment.svg"
                                alt="Comment icon"
                                width={16}
                                height={16}
                            ></Image>
                        </p>
                        <p>
                            {minutesOfReading} min
                            <Image
                                src="/img/icon-time.svg"
                                alt="Time icon"
                                width={16}
                                height={16}
                            ></Image>
                        </p>
                    </div>
                    <p title={timeZone}>{formattedDate}</p>
                </div>
            </div>
        </Link>
    );
}
