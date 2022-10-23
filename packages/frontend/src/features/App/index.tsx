import { observer } from 'mobx-react-lite';

import { useStore } from '../../hooks/useStore';

import { Posts } from '../Posts';
import { Login } from '../Login';

import './index.css';

const AppFC = () => {
  const { authStore } = useStore();
  
  return (
    <>
      {!authStore.user?.id && <Login />}
  
      {authStore.user?.id && <Posts />}
    </>
  );
};

export const App = observer(AppFC);
