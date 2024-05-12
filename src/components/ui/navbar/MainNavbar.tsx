import React, { FC, useContext, useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import LinkButton from '../buttons/LinkButton';
import { AuthContext } from '../../../context/Context';
import { getRoutesForNavbar } from '../../../routes/Routes';

const MainNavbar: FC = () => {
  const {user, isAuth, setIsAuth} = useContext(AuthContext);
  const [routes, setRoutes] = useState<{path: string, name: string}[]>();

  useEffect(() => {
    if (user) {
      setRoutes(getRoutesForNavbar(user.roles))
    }
  }, [user]);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          {
            routes
            ?
            <>
              {
                routes.map((e) => <NavLink to={e.path} key={e.path}>{e.name}</NavLink>)
              }
            </>
            :
            <></>
          }
        </div>
        <div>
          {
            !isAuth
            ?
            <>
              <NavLink to='login'>Вход</NavLink>
              <NavLink to='register'>Регистрация</NavLink>
            </>
            :
            <NavLink to='/' onClick={() => {localStorage.clear(); setIsAuth(false)}}>
              <LinkButton>Выход</LinkButton>
            </NavLink>
          }
        </div>
      </div>
      
      <Outlet />
    </div>
  )
}

export default MainNavbar;