import Link from "next/link";
import { ArticleInfoWithLike } from "@/types/articles";
import Image from "next/image";
import styles from "./article_entry.module.css";

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
        <Link
            href={"article/" + props.articleInfo.slug}
            className={styles.article}
        >
            <div>
                <p className={styles.header}>
                    {props.articleInfo.article_header}
                </p>
                <p className={styles.description}>
                    {props.articleInfo.article_description}
                </p>
                <div className={styles.info}>
                    <div className={styles.statistics}>
                        <p className={styles.stat}>
                            <span>{likeCount}</span>
                            <i
                                className={`${styles.icon} ${styles.icon_star}`}
                            ></i>
                        </p>
                        <p className={styles.stat}>
                            <span>{commentCount}</span>
                            <i
                                className={`${styles.icon} ${styles.icon_comment}`}
                            ></i>
                        </p>
                        <p className={styles.stat}>
                            <span>{minutesOfReading} min</span>
                            <i
                                className={`${styles.icon} ${styles.icon_time}`}
                            ></i>
                        </p>
                    </div>
                    <p title={timeZone}>{formattedDate}</p>
                </div>
            </div>
        </Link>
    );
}
