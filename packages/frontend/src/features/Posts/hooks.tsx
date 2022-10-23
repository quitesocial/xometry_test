import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
} from 'react';

import { useStore } from '../../hooks/useStore';

export const usePosts = () => {
  const {
    authStore: {
      token,
    },
    postsStore: {
      getPosts,
      posts,
      setCurrentUser,
      setEmailsFilterString,
      setPostsFilterString,
      setSorting,
    },
  } = useStore();
  
  const queryParams = new URLSearchParams(location.search);
  
  const handleUserSearch = useCallback((e: BaseSyntheticEvent) => {
    setEmailsFilterString(e.target.value);
  }, []);
  
  const handlePostSearch = useCallback((e: BaseSyntheticEvent) => {
    setPostsFilterString(e.target.value);
  }, []);
  
  const handleSort = useCallback((sorting: 'asc' | 'desc') => {
    setSorting(sorting);
  }, []);
  
  useEffect(() => {
    if (!posts.length && token) {
      getPosts();
    }
    
    const email = queryParams.get('user');
    
    if (email && posts.length) {
      setCurrentUser(email);
    }
  }, [posts]);
  
  return {
    handlePostSearch,
    handleSort,
    handleUserSearch,
  }
}
