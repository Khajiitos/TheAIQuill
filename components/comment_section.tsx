'use client'

import { ArticleInfo, ArticleInfoWithLike } from "@/types/articles";
import { CommentInfo } from "@/types/comments";
import { FormEvent, useEffect, useState } from "react";
import CommentEntry from "./comment_entry";

export default function CommentSection(props: {articleId: number}) {
    const [comments, setComments] = useState<CommentInfo[] | null>(null);
    const [addCommentOpened, setAddCommentOpened] = useState<boolean>(false);
    const [addCommentMessage, setAddCommentMessage] = useState<string | null>(null);
    const [addCommentMessageError, setAddCommentMessageError] = useState<boolean>(false);

    useEffect(() => {
        if (comments === null) {
            fetch('/api/comments?articleId=' + props.articleId).then(res => res.json()).then(json => {
                const comments = json as CommentInfo[];
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
            comment?: CommentInfo
        }

        const json: AddCommentResponse = await fetchResp.json();

        setAddCommentMessageError(json.result === 'fail');
        setAddCommentMessage(json.message);

        if (json.comment) {
            const comment: CommentInfo = json.comment;
            comment.comment_date = new Date(comment.comment_date);

            if (comments) {
                setComments([comment, ...comments as CommentInfo[]]);
            }
        }
    }

	return (
        <aside className="mt-12 font-serif bg-green-800 container-none max-w-7xl m-0 p-10 text-white rounded-sm border-4 border-green-900">
            <h3>Comments</h3>
            {comments !== null && <>{comments.length === 0 && <p>No comments! Be the first one to comment.</p>}</>}
            <button className="bg-green-700 p-4 rounded-lg mt-5 hover:bg-green-600 transition-colors" onClick={() => setAddCommentOpened(!addCommentOpened)}>{addCommentOpened ? 'Hide add comment' : 'Add comment'}</button>

            {addCommentOpened && <>
            <form className="bg-green-700 p-4 mt-5 rounded" onSubmit={onAddComment}>
                <label htmlFor="author">Author</label>
                <br/>
                <input type="text" name="author" placeholder="Anonymous" className="mt-2 p-2 rounded text-black"/>
                <br/><br/>
                <label htmlFor="content">Content</label>
                <br />
                <textarea name="content" className="mt-2 p-2 rounded text-black"/>
                <br />
                <button className="bg-green-600 p-4 rounded-lg mt-5 hover:bg-green-500 transition-colors">Add comment</button>
                {addCommentMessage && (addCommentMessageError ? <p className="mt-3 text-red-500">{addCommentMessage}</p> : <p className="mt-3">{addCommentMessage}</p>)}
            </form>
            </>}

            {comments?.map(comment => (
                <CommentEntry key={comment.id} commentInfo={comment}></CommentEntry>
            ))}
        </aside>
	);
}