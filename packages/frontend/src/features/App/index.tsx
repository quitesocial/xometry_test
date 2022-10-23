import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../hooks/useStore';

import { Posts } from '../Posts';
import { Login } from '../Login';

import './index.css';

const AppFC = () => {
  const { authStore } = useStore();
  
  return (
    <Fragment>
      {!authStore.user?.id && <Login />}
  
      {authStore.user?.id && <Posts />}
    </Fragment>
  );
};

export const App = observer(AppFC);
