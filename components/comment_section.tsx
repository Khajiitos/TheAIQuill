"use client";
import { CommentInfoWithLike } from "@/types/comments";
import { FormEvent, useEffect, useState } from "react";
import CommentEntry from "./comment_entry";
import styles from "./comment_section.module.css";

export default function CommentSection(props: { articleId: number }) {
    const [comments, setComments] = useState<CommentInfoWithLike[] | null>(
        null
    );
    const [addCommentMessage, setAddCommentMessage] = useState<string | null>(
        null
    );
    const [addCommentMessageError, setAddCommentMessageError] =
        useState<boolean>(false);

    useEffect(() => {
        console.log("UE activated");

        if (comments === null) {
            console.log("Fetched new comments");

            fetch("/api/comments?articleId=" + props.articleId)
                .then((res) => res.json())
                .then((json) => {
                    const comments = json as CommentInfoWithLike[];
                    comments.map(
                        (comment) =>
                            (comment.comment_date = new Date(
                                comment.comment_date
                            ))
                    );
                    setComments(comments);
                });
        }
    }, [comments]);

    async function onAddComment(e: FormEvent) {
        e.preventDefault();

        const author = (
            e.target as typeof e.target & { author: { value: string } }
        ).author.value;
        const content = (
            e.target as typeof e.target & { content: { value: string } }
        ).content.value;

        const fetchResp = await fetch("/api/comment", {
            body: JSON.stringify({
                articleId: props.articleId,
                author: author,
                content: content,
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        interface AddCommentResponse {
            result: "ok" | "fail";
            message: string;
            comment?: CommentInfoWithLike;
        }

        const json: AddCommentResponse = await fetchResp.json();

        setAddCommentMessageError(json.result === "fail");
        setAddCommentMessage(json.message);

        if (json.comment) {
            const comment: CommentInfoWithLike = json.comment;
            comment.comment_date = new Date(comment.comment_date);

            if (comments) {
                setComments([comment, ...(comments as CommentInfoWithLike[])]);
            }
        }
    }

    return (
        <>
            <section className={styles.commentSection}>
                <p>
                    Do you have anything to say about this article?
                    <br />
                    Leave a comment!
                </p>

                <form onSubmit={onAddComment} className={styles.commentForm}>
                    {addCommentMessage &&
                        (addCommentMessageError ? (
                            <small>{addCommentMessage}</small>
                        ) : (
                            <small>{addCommentMessage}</small>
                        ))}

                    <div className={`${styles.field} ${styles.author}`}>
                        <label htmlFor="author">Author:</label>
                        <input
                            type="text"
                            name="author"
                            placeholder="Anonymous"
                        />
                    </div>

                    <div className={styles.wrapper}>
                        <div className={styles.field}>
                            <label htmlFor="content">Content:</label>
                            <input name="content" placeholder="Comment..." />
                        </div>
                        <button>Comment</button>
                    </div>
                </form>
            </section>

            <section className={styles.comments}>
                <h2>Comments</h2>
                {comments !== null && (
                    <>
                        {comments.length === 0 && (
                            <small className={styles.noComments}>
                                No comments!
                                <br /> Be the first one to comment.
                            </small>
                        )}
                    </>
                )}
                {comments?.map((comment) => (
                    <CommentEntry
                        key={comment.id}
                        commentInfo={comment}
                        articleId={props.articleId}
                    ></CommentEntry>
                ))}
            </section>
        </>
    );
}
