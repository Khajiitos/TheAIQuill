export interface CommentInfo {
    id: number,
    comment_date: Date,
    author: string,
    content: string,
    replies: CommentInfo[]
}

export interface CommentInfoRow {
    id: number,
    article_id: number,
    author: string,
    content: string,
    reply_to: number,
    ip_address: string,
    comment_date: Date
}