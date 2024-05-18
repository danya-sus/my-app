import React, { FC, useState } from 'react'
import { IEmployee } from '../../contracts/Contracts'
import Modal from '../ui/modal/Modal'
import CustomButton from '../ui/buttons/CustomButton'
import RedactForm from '../ui/input/RedactForm'
import CustomInput from '../ui/input/CustomInput'
import classes from './Employee.module.css'

type EmployeeCardProps = {
    employee: IEmployee
}

const EmployeeCard: FC<EmployeeCardProps> = ({employee}) => {
    const [redactMode, setRedactMode] = useState<boolean>(false);

    const [email, setEmail] = useState<string>(employee.email);
    const [phoneNumber, setPhoneNumber] = useState<string>(employee.phoneNumber);
    const [mothersPhoneNumber, setMothersPhoneNumber] = useState<string>(employee.phoneNumber);
    const [fathersPhoneNumber, setFathersPhoneNumber] = useState<string>(employee.phoneNumber);

    const getName = () => `${employee.lastName} ${employee.firstName} ${employee.middleName}`.trim()
    const getBirthPlace = () => {
        const birthplace = employee.passport.birthPlace;
        return `${birthplace.country}, г. ${birthplace.town}, ул. ${birthplace.street}, д. ${birthplace.house}, к. ${birthplace.corps}`
    }
    const getRegPlace = () => {
        const registerplace = employee.passport.registeredPlace;
        return `${registerplace.country}, г. ${registerplace.town}, ул. ${registerplace.street}, д. ${registerplace.house}, к. ${registerplace.corps}`
    }

    return (
        <div className={classes.employee}>
            <div className={classes.employee__img}>
                {
                    employee.photoId
                    ?
                    <p>Photo</p>
                    :
                    <img src={require('../../images/default-profile-photo.png')} alt='Profile'/>
                }
            </div>
            <hr />
            <div className={classes.employee__body}>
                <h2>{getName()}</h2>
                <hr />
                <Modal title='Информация о работнике'>
                    <div className={classes.employee__body__item}>
                        <p>Профессия: </p>
                        <p>
                            {employee.professions.map((e) => e.name).join(', ')}
                        </p>
                    </div>
                    <div className={classes.employee__body__item}>
                        <p>Дата начала работы: </p>
                        <p>{employee.employmentDate}</p>
                    </div>
                    <div className={classes.employee__body__item}>
                        <p>Кампусы: </p>
                        <p>
                            {employee.campuses.map((e) => e.name).join(', ')}
                        </p>
                    </div>
                </Modal>
                <hr />
                <Modal title='Контактные данные'>
                    <div className={classes.employee__body__item}>
                        <p>Электроная почта: </p>
                        <div className={classes.employee__body__item__input}>
                            <RedactForm redactMode={redactMode} value={employee.email}>
                                <CustomInput 
                                    placeholder='Введите электронную почту' 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    preinputtext={employee.email}
                                />
                            </RedactForm>
                        </div>
                    </div>
                    <div className={classes.employee__body__item}>
                        <p>Номер телефона: </p>
                        <div className={classes.employee__body__item__input}>
                            <RedactForm redactMode={redactMode} value={employee.phoneNumber}>
                                <CustomInput 
                                    placeholder='Введите номер телефона' 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    preinputtext={employee.phoneNumber} 
                                />
                            </RedactForm>
                        </div>
                    </div>
                    <div className={classes.employee__body__item}>
                        <p>Номер телефона матери: </p>
                        <div className={classes.employee__body__item__input}>
                            <RedactForm redactMode={redactMode} value={employee.mothersPhoneNumber}>
                                <CustomInput 
                                    placeholder='Введите номер телефона матери' 
                                    onChange={(e) => setMothersPhoneNumber(e.target.value)} 
                                    preinputtext={employee.mothersFullName} 
                                />
                            </RedactForm>
                        </div>
                    </div>
                    <div className={classes.employee__body__item}>
                        <p>Номер телефона отца: </p>
                        <div className={classes.employee__body__item__input}>
                            <RedactForm redactMode={redactMode} value={employee.fathersPhoneNumber}>
                                <CustomInput 
                                    placeholder='Введите номер телефона отца' 
                                    onChange={(e) => setFathersPhoneNumber(e.target.value)} 
                                    preinputtext={employee.fathersFullName} 
                                />
                            </RedactForm>
                        </div>
                    </div>
                </Modal>
                <hr />
                <Modal title='Паспортные данные'>
                        {
                            employee.passport
                            ?
                            <>
                                <div className={classes.employee__body__item}>
                                    <p>Серия/номер паспорта: </p>
                                    <p>{employee.passport.passportSeries} {employee.passport.passportNumber}</p>
                                </div>
                                <div className={classes.employee__body__item}>
                                    <p>Выдан: </p>
                                    <p>{employee.passport.issuedBy}</p>
                                </div>
                                <div className={classes.employee__body__item}>
                                    <p>Код подразделения: </p>
                                    <p>{employee.passport.issuedCode}</p>
                                </div>
                                <div className={classes.employee__body__item}>
                                    <p>Дата выдачи: </p>
                                    <p>{employee.passport.issuedDate}</p>
                                </div>
                                <div className={classes.employee__body__item}>
                                    <p>Пол: </p>
                                    <p>{employee.passport.gender}</p>
                                </div>
                                <div className={classes.employee__body__item}>
                                    <p>Место рождения: </p>
                                    <p>{getBirthPlace()}</p>
                                </div>
                                <div className={classes.employee__body__item}>
                                    <p>Место регистрации: </p>
                                    <p>{getRegPlace()}</p>
                                </div>
                            </>
                            :
                            <h3>Не задано</h3>
                        }
                    <hr />
                    </Modal>
                    {
                        redactMode
                        ?
                        <div style={{display: 'flex', gridGap: '30px'}}>
                            <CustomButton 
                                onClick={() => {}}
                                backgroundColor='rgb(0, 185, 9)'
                                color='white'
                            >Сохранить</CustomButton>
                            <CustomButton 
                                onClick={() => {setRedactMode(false)}}
                                backgroundColor='grey'
                                color='white'
                            >Отменить</CustomButton>
                        </div>
                        :
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <CustomButton 
                                onClick={() => {setRedactMode(true)}}
                                backgroundColor='grey'
                                color='white'
                            >Редактировать</CustomButton>
                        </div>
                    }
            </div>
        </div>
    )
}
export default EmployeeCard;