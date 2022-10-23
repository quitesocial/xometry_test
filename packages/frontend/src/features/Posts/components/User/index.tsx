import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../../../hooks/useStore';

import './index.css';

type Props = {
  email: string,
}

const UserFC = ({ email }: Props) => {
  const {
    postsStore: {
      currentUser,
      setCurrentUser,
      users,
    },
  } = useStore();
  
  const getUserClassName = useCallback(() => (
    `user ${currentUser === email && 'user_active'}`
  ), [currentUser]);
  
  const handleClick = useCallback(() => (
    setCurrentUser(email)
  ), []);
  
  return (
    <button className={getUserClassName()} onClick={handleClick}>
      <span className='user__email'>{email}</span>
      <span className='user__count'>{users[email].length}</span>
    </button>
  );
};

export const User = observer(UserFC);
