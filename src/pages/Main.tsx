import React, { FC, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Context';
import MainNavbar from '../components/ui/navbar/MainNavbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getRoutes } from '../routes/Routes';

type MainProps = {}

const Main: FC<MainProps> = () => {
    const {user} = useContext(AuthContext);
    const [routes, setRoutes] = useState<React.ReactNode>();

    useEffect(() => {
        let userRoutes = getRoutes(user?.roles);

        setRoutes(
            <Route path='/' element={ <MainNavbar /> }>
                {userRoutes.map((e) => <Route key={e.path} path={e.path} element={e.element}/>)}
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
                    </Routes>
                </BrowserRouter>
                : <></>
            }
        </>
    )
}

export default Main;