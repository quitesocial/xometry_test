import { BaseSyntheticEvent, useState } from 'react';

import { useStore } from '../../hooks/useStore';

import './index.css';

export const useLogin = () => {
  const {
    authStore: {
      register,
      user,
    }
  } = useStore();
  
  const [email, setEmail] = useState('');
  
  const handleClick = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    
    register(email)
      .finally(() => user && setEmail(''));
  };
  
  const handleSubmit = (e: BaseSyntheticEvent) => {
    setEmail(e.target.value);
  };
  
  return {
    email,
    handleClick,
    handleSubmit,
  }
}
