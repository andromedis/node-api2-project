export interface BaseComment {
    text: string,
    post_id: number;
}

export interface Comment extends BaseComment {
    id: number,
    post: string
}
