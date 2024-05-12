import React, { useState } from 'react';
import './App.css';
import { AuthContext } from './context/Context';
import { IUser } from './contracts/Contracts';
import Main from './pages/Main';

function App() {
  const [user, setUser] = useState<IUser>();
  const [isAuth, setIsAuth] = useState(false);

  const state = {
    user: user,
    isAuth: isAuth,
    setIsAuth: (value: boolean) => setIsAuth(value),
    setUser: (value: IUser) => setUser(value)
  }
  
  return (
    <>
      <AuthContext.Provider value={state}>
        <Main />
      </AuthContext.Provider>
    </>
  );
}

export default App;
