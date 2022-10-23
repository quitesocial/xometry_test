import { makeAutoObservable } from 'mobx';

import type { User } from '../../requests/register';
import { register as registerRequest } from '../../requests/register';

type OnSuccessArgs = {
  user?: User,
}

const auth = () => makeAutoObservable(
  {
    error: '',
    loggedIn: Boolean(localStorage.getItem('user')),
    token: JSON.parse(localStorage.getItem('user') || '{}').token ?? '',
    user: JSON.parse(localStorage.getItem('user') || '{}') ?? {},
    
    setLoggedIn(loggedIn: boolean) {
      this.loggedIn = loggedIn;
    },
    
    setToken(token: string) {
      this.token = token;
    },
    
    setUser(user: User) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    
    setError(error: string) {
      this.error = error;
      localStorage.removeItem('user');
    },
    
    onSuccess({ user }: OnSuccessArgs) {
      this.setToken(user?.token || '');
      this.setLoggedIn(true);
      this.setUser(user);
    },
    
    onError(error: string) {
      this.setError(error);
      this.setLoggedIn(false);
    },
    
    register(email: string) {
      return registerRequest(email)
        .then(this.onSuccess)
        .catch(this.onError);
    },
  },
  {},
  { autoBind: true },
);

export const authStore = auth();

export type AuthStore = ReturnType<typeof auth>
