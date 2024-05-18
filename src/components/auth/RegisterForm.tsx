import React, { FC, useState } from 'react'
import AuthService from '../../api/AuthService'
import CustomInput from '../ui/input/CustomInput'
import CustomButton from '../ui/buttons/CustomButton'
import LinkButton from '../ui/buttons/LinkButton'
import classes from './Auth.module.css'
import CrossButton from '../ui/buttons/CrossButton'
import { useNavigate } from 'react-router'
import MyCalendar from '../ui/calendar/MyCalendar'

type RegisterFormProps = {}

const RegisterForm: FC<RegisterFormProps> = ({}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    lastName: '',
    firstName: '',
    middleName: '',
    birthday: new Date(),
    password: '',
    confirmPassword: ''
  })

  const setBirthday = (e: Date) => {
    setValues({...values, ['birthday']: e})
  }

  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value})
  }

  const register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const response = await AuthService.register(
      {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
        birthDate: values.birthday.toLocaleDateString()
      }
    );

    if (response) {
      navigate('/login')
    }
  }

  return (
    <form className={classes.register__form}>
      <div className={classes.register__form__content}>
        <div className={classes.register__form__content__header}>
          <h2>Регистрация</h2>
        </div>
        <hr />
        <div className={classes.register__form__content__body}>
          <div className={classes.register__form__content__body__name}>
            <CustomInput 
              required 
              name='lastName'
              pattern='^[А-Яа-я]{2,16}$' 
              placeholder='Фамилия' 
              errormessage={'Фамилия должна состоять из 2-16 букв русского алфавита'} 
              onChange={(e) => setValue(e)}
            />
            <CustomInput 
              required 
              name='firstName'
              pattern='^[А-Яа-я]{2,16}$' 
              placeholder='Имя' 
              errormessage={'Имя должно состоять из 2-16 букв русского алфавита'} 
              onChange={(e) => setValue(e)}
            />
            <CustomInput 
              name='middleName' 
              pattern='^[А-Яа-я]{2,16}$' 
              placeholder='Отчество' 
              onChange={(e) => setValue(e)}
            />
          </div>
          <div>
            <p>Дата рождения</p>
            <MyCalendar onClickDay={(e) => setBirthday(e)}/>
          </div>
          <CustomInput 
            required 
            name='email'
            type='email' 
            placeholder='E-mail'
            errormessage='Адрес электронной почты указан неверно' 
            onChange={(e) => setValue(e)}
          />
          <div className={classes.register__form__content__body__password}>
            <CustomInput 
              required 
              name='password'
              pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}'
              type='password' 
              placeholder='Пароль' 
              errormessage='Пароль должен содержать от 8 символов, включать английские буквы нижнего и верхнего регистров, цифры и специальные символы'
              onChange={(e) => setValue(e)}
            />
            <CustomInput 
              required 
              name='confirmPassword'
              pattern={values.password}
              type='password' 
              placeholder='Подтвердите пароль' 
              errormessage='Пароли не совпадают'
              onChange={(e) => setValue(e)}
            />
          </div>
        </div>
        <div className={classes.register__form__content__buttons}>
          <CustomButton 
            backgroundColor='rgb(35, 150, 31)'
            color='white'
            onClick={(e) => register(e)}>Зарегистрироваться</CustomButton>
          <div onClick={() => navigate('/login')}>
            <LinkButton>У меня есть аккаунт</LinkButton>
          </div>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm;