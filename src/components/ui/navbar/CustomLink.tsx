import React, { FC } from 'react'
import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

type CustomLinkProps = {
    to: string,
    children: any
}

const CustomLink: FC<CustomLinkProps> = ({...props}) => {
    const setActive = (isActive: boolean) => isActive ? classes.active_link : classes.link;

    return (
        <div className={classes.navbar__routes__item}>
            <NavLink className={(e) => setActive(e.isActive)} to={props.to}>{props.children}</NavLink>
        </div>
    )
}

export default CustomLink;