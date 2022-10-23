import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../hooks/useStore';

import { User } from './components/User'
import { Post } from './components/Post'

import { usePosts } from './hooks';

import './index.css';

const PostsFC = () => {
  const {
    postsStore: {
      emailsFilterString,
      filteredEmails,
      filteredPosts,
      postsFilterString,
      sorting,
    },
  } = useStore()
  
  const {
    handlePostSearch,
    handleSort,
    handleUserSearch,
  } = usePosts()
  
  return (
    <main className='posts'>
      <header className='posts__header'>
        <h1 className='posts__heading'>POSTS</h1>
      </header>
      <section className='posts__container'>
        <nav className='users'>
          <input
            className='users__search'
            onInput={handleUserSearch}
            placeholder='Search users'
            type='text'
            value={emailsFilterString}
          />
          
          {
            filteredEmails && filteredEmails.map(
              (email, idx) => (
                <User email={email} key={`${email}_${idx}`} />
              )
            )
          }
        </nav>
        <article className='cards'>
          <div className='cards__settings'>
            <div className='cards__sorting-container'>
              <button
                className={`cards__sort-asc ${sorting === 'asc' && 'active'}`}
                onClick={() => handleSort('asc')}
              >
                &uarr;
              </button>
              <button
                className={`cards__sort-desc ${sorting === 'desc' && 'active'}`}
                onClick={() => handleSort('desc')}
              >
                &darr;
              </button>
            </div>
            <input
              className='cards__search'
              onInput={handlePostSearch}
              placeholder='Search posts'
              type='text'
              value={postsFilterString}
            />
          </div>
          
          {
            filteredPosts.length > 0 && filteredPosts.map(
              (post, idx) => (
                <Post
                  body={post.body}
                  date={post.date}
                  key={`${post.id}_${idx}`}
                  title={post.title}
                />
              )
            )
          }
        </article>
      </section>
    </main>
  );
};

export const Posts = observer(PostsFC);
