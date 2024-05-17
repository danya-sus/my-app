import React, { FC } from 'react';
import classes from './Auth.module.css';
import CrossButton from '../ui/buttons/CrossButton';
import CustomInput from '../ui/input/CustomInput';
import CustomButton from '../ui/buttons/CustomButton';
import LinkButton from '../ui/buttons/LinkButton';
import { useNavigate } from 'react-router';

type LoginFormProps = {
  setLogin: (e: string) => any,
  setPassword: (e: string) => any,
  loginUser: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}

const LoginForm: FC<LoginFormProps> = ({setLogin, setPassword, loginUser}) => {
  const navigate = useNavigate();
  return (
    <form className={classes.login__form}>
      <div className={classes.login__form__content}>
        <div className={classes.login__form__content__header}>
          <h2>Авторизация</h2>
          <CrossButton onClick={() => {}}/>
        </div>
        <hr />
        <div className={classes.login__form__content__body}>
          <CustomInput required type='email' errormessage='Адрес электронной почты указан неверно' placeholder='Введите логин' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)} />
          <CustomInput required type='password' placeholder='Введите пароль' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        </div>
        <div className={classes.login__form__content__buttons}>
          <CustomButton backgroundColor='rgb(35, 150, 31)' color='white' onClick={loginUser}>Войти</CustomButton>
          <div onClick={() => navigate('/register')}>
            <LinkButton>У меня нет аккаунта</LinkButton>
          </div>
        </div>
      </div>
    </form>
  )
}

export default LoginForm;