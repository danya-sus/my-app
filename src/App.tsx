import React, { useState } from 'react';
import './App.css';
import MainNavbar from './components/ui/navbar/MainNavbar';
import { AuthContext } from './context/Context';
import Home from './pages/Home';
import { IUser } from './contracts/Contracts';

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
    <AuthContext.Provider value={state}>
      <MainNavbar />
    </AuthContext.Provider>
  );
}

export default App;
