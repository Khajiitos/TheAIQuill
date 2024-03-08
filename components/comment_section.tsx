"use client";
import { CommentInfoWithLike } from "@/types/comments";
import { FormEvent, useEffect, useState } from "react";
import CommentEntry from "./comment_entry";

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
        if (comments === null) {
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
    });

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
            <aside>
                <p>
                    Do you have anything to say about this article?
                    <br />
                    Leave a comment!
                </p>

                {
                    <>
                        <form onSubmit={onAddComment}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="author">
                                                Author:
                                            </label>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="author"
                                                placeholder="Anonymous"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="content">
                                                Content:
                                            </label>
                                        </td>
                                        <td>
                                            <input
                                                name="content"
                                                placeholder="Comment..."
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button>Comment</button>
                            {addCommentMessage &&
                                (addCommentMessageError ? (
                                    <p>{addCommentMessage}</p>
                                ) : (
                                    <p>{addCommentMessage}</p>
                                ))}
                        </form>
                    </>
                }
            </aside>
            <aside>
                <p>Comments</p>
                {comments !== null && (
                    <>
                        {comments.length === 0 && (
                            <p>
                                No comments!
                                <br /> Be the first one to comment.
                            </p>
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
            </aside>
        </>
    );
}
