export interface BasePost {
    title: string;
    contents: string;
}

export interface Post extends BasePost {
    id: number;
}
