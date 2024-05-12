import React, { FC, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Context';
import MainNavbar from '../components/ui/navbar/MainNavbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getRoutes } from '../routes/Routes';
import NotFound from './NotFound';

const Main: FC = () => {
    const {user} = useContext(AuthContext);
    const [routes, setRoutes] = useState<React.ReactNode>();

    useEffect(() => {
        let userRoutes = getRoutes(user?.roles);

        setRoutes(
            <Route path='/' element={ <MainNavbar /> }>
                {userRoutes.map((e) => <Route key={e.path} path={e.path} element={e.element}/>)}
                <Route path='notfound' element={<NotFound />}/>
            </Route>
        )
    }, [user])

    return (
        <>
            {
                routes
                ?
                <BrowserRouter>
                    <Routes>
                        {
                            routes
                        }
                        <Route path='*' element={<Navigate to={'/notfound'} />}/>
                    </Routes>
                </BrowserRouter>
                : <></>
            }
        </>
    )
}

export default Main;