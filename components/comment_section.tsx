'use client'

import { ArticleInfo, ArticleInfoWithLike } from "@/types/articles";
import { CommentInfo, CommentInfoWithLike } from "@/types/comments";
import { FormEvent, useEffect, useState } from "react";
import CommentEntry from "./comment_entry";

export default function CommentSection(props: {articleId: number}) {
    const [comments, setComments] = useState<CommentInfoWithLike[] | null>(null);
    const [addCommentMessage, setAddCommentMessage] = useState<string | null>(null);
    const [addCommentMessageError, setAddCommentMessageError] = useState<boolean>(false);

    useEffect(() => {
        if (comments === null) {
            fetch('/api/comments?articleId=' + props.articleId).then(res => res.json()).then(json => {
                const comments = json as CommentInfoWithLike[];
                comments.map(comment => comment.comment_date = new Date(comment.comment_date));
                setComments(comments);
            });
        }
    });

    async function onAddComment(e: FormEvent) {
        e.preventDefault();

        const author = (e.target as typeof e.target & {author: {value: string}}).author.value;
        const content = (e.target as typeof e.target & {content: {value: string}}).content.value;

        const fetchResp = await fetch('/api/comment', {
            body: JSON.stringify({articleId: props.articleId, author: author, content: content}),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        interface AddCommentResponse {
            result: 'ok' | 'fail',
            message: string;
            comment?: CommentInfoWithLike
        }

        const json: AddCommentResponse = await fetchResp.json();

        setAddCommentMessageError(json.result === 'fail');
        setAddCommentMessage(json.message);

        if (json.comment) {
            const comment: CommentInfoWithLike = json.comment;
            comment.comment_date = new Date(comment.comment_date);

            if (comments) {
                setComments([comment, ...comments as CommentInfoWithLike[]]);
            }
        }
    }

	return (
        <>
        <aside className="mt-12 bg-entry rounded-lg p-5 w-full p-10 text-text">
            <p>Do you have anything to say about this article?<br/>Leave a comment!</p>

            {<>
            <form className="mt-5 rounded" onSubmit={onAddComment}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label className="mr-3 text-text" htmlFor="author">Author:</label>
                            </td>
                            <td>
                                <input type="text" name="author" placeholder="Anonymous" className="text-sm mt-2 p-2 pl-4 rounded-full bg-input text-text shadow-xl"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className="mr-3 text-text" htmlFor="content">Content:</label>
                            </td>
                            <td>
                                <input name="content" placeholder="Comment..." className="text-sm mt-2 p-2 pl-4 rounded-full text-text bg-input shadow-xl"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="bg-secondary p-2 rounded-lg mt-5 hover:bg-accent w-full transition-colors shadow-xl">Comment</button>
                {addCommentMessage && (addCommentMessageError ? <p className="mt-3 text-red-500">{addCommentMessage}</p> : <p className="mt-3">{addCommentMessage}</p>)}
            </form>
            </>}

        </aside>
        <aside>
            <p className="text-text text-center mt-8 text-3xl">Comments</p>
            {comments !== null && <>{comments.length === 0 && <p className="text-center">No comments!<br/> Be the first one to comment.</p>}</>}
            {comments?.map(comment => (
                <CommentEntry key={comment.id} commentInfo={comment} articleId={props.articleId}></CommentEntry>
            ))}
        </aside>
        </>
	);
}