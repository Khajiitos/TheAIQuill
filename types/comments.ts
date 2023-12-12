export interface CommentInfo {
    id: number,
    comment_date: Date,
    author: string,
    content: string,
    replies: CommentInfo[],
    like_count: number
}

export interface CommentInfoWithLike extends CommentInfo {
    comment_liked: boolean
}

export interface CommentInfoRow {
    id: number,
    article_id: number,
    author: string,
    content: string,
    reply_to: number,
    ip_address: string,
    comment_date: Date,
    like_count: number,
    comment_liked: boolean
}