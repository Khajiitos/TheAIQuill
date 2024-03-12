"use client";
import styles from "./article_inner_stats.module.css";

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
        <div className={styles.statsContainer}>
            <small title={timeZone}>{formattedDate}</small>
            <div className={styles.stats}>
                <small className={styles.stat}>
                    <span>{props.likeCount}</span>
                    <i className={`${styles.icon} ${styles.icon_star}`}></i>
                </small>
                <small className={styles.stat}>
                    <span>{props.commentCount}</span>

                    <i className={`${styles.icon} ${styles.icon_comment}`}></i>
                </small>
                <small className={styles.stat}>
                    <span>{props.minutesOfReading} min</span>
                    <i className={`${styles.icon} ${styles.icon_time}`}></i>
                </small>
            </div>
        </div>
    );
}
