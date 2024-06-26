import React, { FC, useState } from 'react'
import { IResidend } from '../../contracts/Contracts'
import Modal from '../ui/modal/Modal'
import CustomButton from '../ui/buttons/CustomButton'
import ResidentsService from '../../api/ResidentsService'
import { useNavigate } from 'react-router'
import RedactForm from '../ui/input/RedactForm'
import CustomInput from '../ui/input/CustomInput'
import classes from './Residents.module.css'

type ResidentCardProps = {
    resident: IResidend,
}

const ResidentCard: FC<ResidentCardProps> = ({resident}) => {
    const navigate = useNavigate();
    const [redactMode, setRedactMode] = useState<boolean>(false);

    const [email, setEmail] = useState<string>(resident.email);
    const [phoneNumber, setPhoneNumber] = useState<string>(resident.phoneNumber);
    const [mothersPhoneNumber, setMothersPhoneNumber] = useState<string>(resident.phoneNumber);
    const [fathersPhoneNumber, setFathersPhoneNumber] = useState<string>(resident.phoneNumber);

    const getName = () => `${resident.lastName} ${resident.firstName} ${resident.middleName}`.trim()
    const getAccomodation = () => `${resident.campus.name} - ${resident.room.block}${resident.room.blockCode}`
    const getStatus = () => resident.isLeftCampus ? 'Выселился' : 'Проживает'
    const getBirthPlace = () => {
        const birthplace = resident.passport.birthPlace;
        return `${birthplace.country}, г. ${birthplace.town}, ул. ${birthplace.street}, д. ${birthplace.house}, к. ${birthplace.corps}`
    }
    const getRegPlace = () => {
        const registerplace = resident.passport.registeredPlace;
        return `${registerplace.country}, г. ${registerplace.town}, ул. ${registerplace.street}, д. ${registerplace.house}, к. ${registerplace.corps}`
    }

    const updateResident = async () => {
        let updatedResident = resident;

        updatedResident.email = email;
        updatedResident.phoneNumber = phoneNumber;
        updatedResident.mothersPhoneNumber = mothersPhoneNumber;
        updatedResident.fathersPhoneNumber = fathersPhoneNumber;

        let response = await ResidentsService.updateResident(updatedResident);

        if (response) {
            resident = updatedResident
            setRedactMode(false);
        }

        alert("Что-то пошло не так")
    }

    const deleteResident = async () => {
        const response = await ResidentsService.deleteResident(resident.id);
        if (response) {
            navigate(-1);
        }
        else {
            alert("При удалении что-то пошло не так...");
        }
    }

    return (
        <div className={classes.resident__card}>
            <div>
                {
                    resident.photoId
                    ?
                    <p>Photo</p>
                    :
                    <img src={require('../../images/default-profile-photo.png')} alt='Profile'/>
                }
            </div>
            <hr />
            <div className={classes.resident__card__body}>
                <h2>{getName()}</h2>
                <hr />
                <div style={{display: 'flex'}}>
                    <h3>{getAccomodation()}</h3>
                    <h3>{getStatus()}</h3>
                </div>
                <hr />
                <Modal title='Контактные данные'>
                    <div className={classes.resident__card__body__item}>
                        <p>Электроная почта: </p>
                        <div className={classes.resident__card__body__item__input}>
                            <RedactForm redactMode={redactMode} value={resident.email}>
                                <CustomInput 
                                    placeholder='Введите электронную почту' 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    preinputtext={resident.email}
                                />
                            </RedactForm>
                        </div>
                    </div>
                    <div className={classes.resident__card__body__item}>
                        <p>Номер телефона: </p>
                        <div className={classes.resident__card__body__item__input}>
                            <RedactForm redactMode={redactMode} value={resident.phoneNumber}>
                                <CustomInput 
                                    placeholder='Введите номер телефона' 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    preinputtext={resident.phoneNumber} 
                                />
                            </RedactForm>
                        </div>
                    </div>
                    <div className={classes.resident__card__body__item}>
                        <p>Номер телефона матери: </p>
                        <div className={classes.resident__card__body__item__input}>
                            <RedactForm redactMode={redactMode} value={resident.mothersPhoneNumber}>
                                <CustomInput 
                                    placeholder='Введите номер телефона матери' 
                                    onChange={(e) => setMothersPhoneNumber(e.target.value)} 
                                    preinputtext={resident.mothersFullName} 
                                />
                            </RedactForm>
                        </div>
                    </div>
                    <div className={classes.resident__card__body__item}>
                        <p>Номер телефона отца: </p>
                        <div className={classes.resident__card__body__item__input}>
                            <RedactForm redactMode={redactMode} value={resident.fathersPhoneNumber}>
                                <CustomInput 
                                    placeholder='Введите номер телефона отца' 
                                    onChange={(e) => setFathersPhoneNumber(e.target.value)} 
                                    preinputtext={resident.fathersFullName} 
                                />
                            </RedactForm>
                        </div>
                    </div>
                </Modal>
                <hr />
                <Modal title='Паспортные данные'>
                    {
                        resident.passport
                        ?
                        <>
                            <div className={classes.resident__card__body__item}>
                                <p>Серия/номер паспорта: </p>
                                <p>{resident.passport.passportSeries} {resident.passport.passportNumber}</p>
                            </div>
                            <div className={classes.resident__card__body__item}>
                                <p>Выдан: </p>
                                <p>{resident.passport.issuedBy}</p>
                            </div>
                            <div className={classes.resident__card__body__item}>
                                <p>Код подразделения: </p>
                                <p>{resident.passport.issuedCode}</p>
                            </div>
                            <div className={classes.resident__card__body__item}>
                                <p>Дата выдачи: </p>
                                <p>{resident.passport.issuedDate}</p>
                            </div>
                            <div className={classes.resident__card__body__item}>
                                <p>Пол: </p>
                                <p>{resident.passport.gender}</p>
                            </div>
                            <div className={classes.resident__card__body__item}>
                                <p>Место рождения: </p>
                                <p>{getBirthPlace()}</p>
                            </div>
                            <div className={classes.resident__card__body__item}>
                                <p>Место регистрации: </p>
                                <p>{getRegPlace()}</p>
                            </div>
                        </>
                        :
                        <h3>Не задано</h3>
                    }
                </Modal>
                <hr />
                {
                    redactMode
                    ?
                    <div className={classes.resident__card__btns}>
                        <CustomButton 
                            onClick={() => updateResident()}
                            backgroundColor='rgb(0, 185, 9)'
                            color='white'
                        >Сохранить</CustomButton>
                        <CustomButton 
                            onClick={() => setRedactMode(false)}
                            backgroundColor='grey'
                            color='white'
                        >Отмена</CustomButton>
                    </div>
                    :
                    <div className={classes.resident__card__btns}>
                        <CustomButton 
                            onClick={() => {setRedactMode(true)}}
                            backgroundColor='grey'
                            color='white'
                        >Редактировать</CustomButton>
                        <CustomButton 
                            onClick={deleteResident}
                            backgroundColor='rgb(236, 0, 0)'
                            color='white'
                        >Удалить</CustomButton>
                    </div>
                }
            </div>
        </div>
    )
}

export default ResidentCard;