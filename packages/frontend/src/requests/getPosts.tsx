import { url } from '../config';

import { User } from './register';

export type Post = {
  body: string,
  date: string,
  from: User,
  id: string,
  title: string,
  to: User,
}

export type Posts = Array<Post>

type Response = {
  page?: number,
  pages?: number,
  posts?: Posts,
  errors?: Array<string>,
}

export const getPosts = async (token: string): Promise<Response> => {
  try {
    const response = await fetch(`${url}/posts?token=${token}`);
    const { errors, posts }: Response = await response.json();
    
    if (posts && posts.length > 0) return Promise.resolve({ posts });
    
    if (errors && errors.length > 0) return Promise.reject(errors[0]);
    
    return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};
