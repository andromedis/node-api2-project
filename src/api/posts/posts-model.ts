const db = require('../../../data/db-config');
import { BasePost, Post } from "./post.interface";
import { BaseComment, Comment } from './comment.interface';

export function find(): Promise<Post[]> {
  return db('posts');
}

export function findById(id: number): Promise<Post | undefined> {
  return db('posts').where({ id: Number(id) }).first()
}

// Returns promise containing object containing id of inserted post
export function insert(post: BasePost): Promise<{ id: number }> {
  return db('posts')
    .insert(post, 'id')
    .then((ids: number[]) => ({ id: ids[0] }));
}

// Returns promise containing number of updated records
export function update(id: number, post: BasePost): Promise<number> {
  return db('posts')
    .where('id', Number(id))
    .update(post);
}

// Returns promise containing number of deleted records
export function remove(id: number): Promise<number> {
  return db('posts')
    .where('id', Number(id))
    .del();
}

export function findPostComments(postId: number): Promise<Comment[]> {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('post_id', postId);
}

export function findCommentById(id: number): Promise<Comment | undefined> {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('comments.id', id).first();
}

// Returns promise containing object containing id of inserted post
export function insertComment(comment: BaseComment): Promise<{ id: number }> {
  return db('comments')
    .insert(comment)
    .then((ids: number[]) => ({ id: ids[0] }));
}
