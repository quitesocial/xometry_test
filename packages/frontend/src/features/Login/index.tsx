import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../hooks/useStore';

import { useLogin } from './hooks';

import './index.css';

const LoginFC = () => {
  const { authStore: { error } } = useStore();
  
  const {
    email,
    handleClick,
    handleSubmit,
  } = useLogin();
  
  return (
    <main className='login'>
      <section className='login__container'>
        <h1 className='login__heading'>login</h1>
        <form className='login__form'>
          <input
            className='login__input'
            placeholder='Enter your email here'
            type='email'
            value={email}
            onInput={handleSubmit}
          />
          <button className='login__submit' onClick={handleClick}>
            register
          </button>
          
          {error && <p className='login__error'>{error}</p>}
        </form>
      </section>
    </main>
  );
};

export const Login = observer(LoginFC);
