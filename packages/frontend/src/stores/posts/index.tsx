import { makeAutoObservable } from 'mobx';

import type { Post, Posts } from '../../requests/getPosts';

import { getPosts as getPostsRequest } from '../../requests/getPosts';

import { authStore } from '../auth';

type OnSuccessArgs = {
  posts?: Posts,
}

const posts = () => makeAutoObservable(
  {
    authStore,
    currentUser: '',
    error: '',
    emailsFilterString: '',
    posts: [] as Posts,
    postsFilterString: '',
    sorting: 'desc',
    
    setCurrentUser(email: string) {
      this.currentUser = email;
    },
    
    setError(error: string) {
      this.error = error;
    },
    
    setEmailsFilterString(emailFilterString: string) {
      this.emailsFilterString = emailFilterString;
    },
    
    setPosts(posts: Posts) {
      this.posts = posts;
    },
    
    setPostsFilterString(postsFilterString: string) {
      this.postsFilterString = postsFilterString;
    },
    
    setSorting(sorting: 'asc' | 'desc') {
      this.sorting = sorting;
    },
    
    onSuccess({ posts }: OnSuccessArgs) {
      this.setPosts(posts || []);
      this.setCurrentUser(this.sortedEmails[0]);
    },
    
    onError(error: string) {
      this.setError(error);
      this.authStore.setLoggedIn(false);
    },
    
    getPosts() {
      return getPostsRequest(this.authStore.token)
        .then(this.onSuccess)
        .catch(this.onError);
    },
    
    get filteredPosts(): Posts {
      const postsByUser = this.posts.filter(
        post => post.from && post.from.email === this.currentUser
      );
      
      const postsBySearch = postsByUser.filter(
        post => (
          post.title.includes(this.postsFilterString)
          || post.body.includes(this.postsFilterString)
        )
      );
      
      const sortedPosts = postsBySearch.sort(
        (a, b) => {
          if (a.date < b.date) return -1;
          if (a.date > a.date) return 1;
          return 0;
        }
      );
      
      return this.sorting === 'desc' ? sortedPosts : sortedPosts.reverse();
    },
    
    get users(): { [key: string]: Posts } {
      return this.posts.reduce(
        (acc: { [key: string]: Posts }, cur: Post) => {
          if (cur.from && !acc.hasOwnProperty(cur.from.email)) {
            acc[cur.from.email] = this.posts.filter(
              post => (post.from && cur.from) && post.from.email === cur.from.email
            );
          }
          
          return acc;
        },
        {},
      );
    },
    
    get sortedEmails(): Array<string> {
      return Object.keys(this.users).sort(
        (a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        }
      );
    },
    
    get filteredEmails(): Array<string> {
      return this.sortedEmails.filter(
        (email: string) => email.includes(this.emailsFilterString),
      );
    },
  },
  {},
  { autoBind: true },
);

export const postsStore = posts();

export type PostsStore = ReturnType<typeof posts>
