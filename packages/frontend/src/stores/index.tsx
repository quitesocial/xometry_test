import type { AuthStore } from './auth'
import type { PostsStore } from './posts'

import { authStore } from './auth'
import { postsStore } from './posts'

export type RootStore = {
  authStore: AuthStore,
  postsStore: PostsStore,
}

export const rootStore: RootStore = {
  authStore,
  postsStore,
};
