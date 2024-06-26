import React, { FC, useContext, useState } from 'react';
import AuthService from '../api/AuthService'
import LoginForm from '../components/auth/LoginForm';
import { AuthContext } from '../context/Context';
import { useNavigate } from 'react-router';

const Login: FC = () => {
    const navigate = useNavigate();
    const {setIsAuth, setUser} = useContext(AuthContext);
    const [login, setLogin] = useState('alex@test.com'); // Commandant
    //const [login, setLogin] = useState('sergei@test.com'); // Resident
    const [password, setPassword] = useState('Password123!');

    const loginUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const response = await AuthService.login({email: login, password: password});

        if (response) {
            setIsAuth(true)
            setUser(response)
            navigate('/')
        }
    }

    
    return (
        <AuthContext.Consumer>
            {() => (
                <LoginForm setLogin={setLogin} setPassword={setPassword} loginUser={loginUser}/>
            )}
        </AuthContext.Consumer>
    )
}

export default Login;