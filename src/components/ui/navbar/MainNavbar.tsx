import React, { FC, useContext, useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import LinkButton from '../buttons/LinkButton';
import { AuthContext } from '../../../context/Context';
import { getRoutesForNavbar } from '../../../routes/Routes';
import classes from './Navbar.module.css';

const MainNavbar: FC = () => {
  const {user, isAuth, setIsAuth, setUser} = useContext(AuthContext);
  const [routes, setRoutes] = useState<{path: string, name: string}[]>();

  useEffect(() => {
    if (user) {
      setRoutes(getRoutesForNavbar(user.roles))
    }
  }, [user]);

  return (
    <div>
      <div className={classes.navbar}>
        <div className={classes.navbar__routes}>
          {
            routes
            ?
            <>
              {
                routes.map((e) => <NavLink to={e.path} key={e.path} className={classes.navbar__routes__item}>{e.name}</NavLink>)
              }
            </>
            :
            <></>
          }
        </div>
        <div className={classes.navbar__auth}>
          {
            !isAuth
            ?
            <>
              <NavLink to='login' className={classes.navbar__auth__login}>Вход</NavLink>
              <NavLink to='register' className={classes.navbar__auth__btn}>Регистрация</NavLink>
            </>
            :
            <NavLink to='/' onClick={() => {localStorage.clear(); setIsAuth(false); setRoutes([])}} className={classes.navbar__auth__logout}>
              Выход
            </NavLink>
          }
        </div>
      </div>
      
      <Outlet />
    </div>
  )
}

export default MainNavbar;