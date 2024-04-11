import React, { FC, useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import LinkButton from '../buttons/LinkButton';
import { AuthContext } from '../../../context/Context';

type MainNavbarProps = {}

const MainNavbar: FC<MainNavbarProps> = ({}) => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <NavLink to='/home'>Home</NavLink>
          <NavLink to='residents'>Residents</NavLink>
          <NavLink to='profile'>Profile</NavLink>
          <NavLink to='requests'>Requests</NavLink>
          <NavLink to='employees'>Employees</NavLink>
        </div>
        <div>
          {
            !isAuth
            ?
            <>
              <NavLink to='login'>Login</NavLink>
              <NavLink to='register'>Register</NavLink>
            </>
            :
            <NavLink to='/' onClick={() => {localStorage.clear(); setIsAuth(false)}}>
              <LinkButton>Logout</LinkButton>
            </NavLink>
          }
        </div>
      </div>
      
      <Outlet />
    </div>
  )
}

export default MainNavbar;