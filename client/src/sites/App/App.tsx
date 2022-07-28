import React from 'react';
import { NotificationPermissionPopover, Router } from '../../components/elements';
import { PwaInstallPage } from '../../components/pages';
import AuthContextProvider from '../../states/contexts/AuthContext/AuthContext';
import CartContextProvider from '../../states/contexts/CartContext/CartContext';
import { useApp } from '../../states/hooks/useApp/useApp';
import { Session } from '../../types/verification';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const sessions: Session[] = [
  {
    "id": '1',
    "user": {
        "id": "629faa216e06ffb026713166",
        "email": "lennyderyck@gmail.com",
        "firstName": "Lennert",
        "lastName": "De Ryck",
        "role": "61eec55b38e0766ab63c049c",
        "createdAt": "2022-06-07T19:42:25.135Z",
        "updatedAt": "2022-06-07T19:42:25.135Z"
    },
    lastAccess: '2022-06-07T21:20:34.340Z'
  },
  {
    "id": '2',
    "user": {
        "id": "629faa216e06ffb026713166",
        "email": "example@gmail.com",
        "firstName": "Older",
        "lastName": "User",
        "role": "61eec55b38e0766ab63c049c",
        "createdAt": "2022-06-07T19:42:25.135Z",
        "updatedAt": "2022-06-07T19:42:25.135Z"
    },
    lastAccess: '2022-06-08T21:20:34.340Z'
  },
]

// window.localStorage.setItem('sessions', JSON.stringify(sessions));

function App() {
  const app = useApp();
  
  return <>
    <AuthContextProvider>
      <CartContextProvider>
        {/* { app.installed && process.env.NODE_ENV === 'development' ? 
          <Router /> :
          <PwaInstallPage />
        } */}
        <Router />
        <ToastContainer
          position="bottom-center"
          autoClose={ 5000 }
          hideProgressBar={ true }
          newestOnTop={ false }
          rtl={ false }
          draggable
        />
      </CartContextProvider>
    </AuthContextProvider>
  </>;
}

export default App;

