import { url } from '../config';

export type User = {
  email: string,
  id: string,
  token: string,
} | undefined

type Response = {
  errors?: Array<string>,
  user?: User,
}

export const register = async (email: string): Promise<Response> => {
  try {
    const response = await fetch(`${url}/register?email=${email}`);
    const { errors, user }: Response = await response.json();
    
    if (user?.token) return Promise.resolve({ user });
  
    if (errors && errors.length > 0) return Promise.reject(errors[0]);
    
    return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};
