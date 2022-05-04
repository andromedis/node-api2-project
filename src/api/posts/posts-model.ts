import { db } from '../../../data/db-config';
import { BasePost, Post } from "./post.interface";
import { BaseComment, Comment } from './comment.interface';

export function find(): Promise<Post[]> {
  return db('posts');
}

export function findById(id: number): Promise<Post> {
  return db('posts').where({ id: Number(id) }).first()
}

export async function insert(post: BasePost): Promise<Post> {
  // return db('posts')
  //   .insert(post, 'id')
  //   .then((ids: number[]) => ({ id: ids[0] }));
  const id: number = await db('posts').insert(post, 'id')
  return findById(id)
}

export function update(id: number, post: BasePost): Promise<Post> {
  return db('posts')
    .where('id', Number(id))
    .update(post);
}

export function remove(id: number): Promise<Post> {
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

export function findCommentById(id: number): Promise<Comment> {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('comments.id', id).first();
}

export async function insertComment(comment: BaseComment): Promise<Comment> {
  // return db('comments')
  //   .insert(comment)
  //   .then((ids: number[]) => ({ id: ids[0] }));
  const id: number = await db('comments').insert(comment)
  return findCommentById(id)
}
