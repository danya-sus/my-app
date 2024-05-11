import React, { FC } from 'react'
import { IResidend } from '../../contracts/Contracts'
import Modal from '../ui/modal/Modal'
import CustomButton from '../ui/buttons/CustomButton'
import ResidentsService from '../../api/ResidentsService'
import { useNavigate } from 'react-router'

type ResidentCardProps = {
    resident: IResidend,
}

const ResidentCard: FC<ResidentCardProps> = ({resident}) => {
    const navigate = useNavigate();

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
        <div>
            <div style={{display: 'flex'}}>
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
                <div>
                    <h2>{getName()}</h2>
                    <div style={{display: 'flex'}}>
                        <h3>{getAccomodation()}</h3>
                        <h3>{getStatus()}</h3>
                    </div>
                    <Modal title='Контактные данные'>
                        <div>
                            <p>Электроная почта: </p>
                            <p>{resident.email}</p>
                        </div>
                        <div>
                            <p>Номер телефона: </p>
                            <p>{resident.phoneNumber}</p>
                        </div>
                        <div>
                            <p>Номер телефона матери: </p>
                            <p>{resident.mothersPhoneNumber}</p>
                        </div>
                        <div>
                            <p>Номер телефона отца: </p>
                            <p>{resident.fathersPhoneNumber}</p>
                        </div>
                    </Modal>
                    <Modal title='Паспортные данные'>
                        {
                            resident.passport
                            ?
                            <>
                                <div>
                                    <p>Серия/номер паспорта: </p>
                                    <p>{resident.passport.passportSeries} {resident.passport.passportNumber}</p>
                                </div>
                                <div>
                                    <p>Выдан: </p>
                                    <p>{resident.passport.issuedBy}</p>
                                </div>
                                <div>
                                    <p>Код подразделения: </p>
                                    <p>{resident.passport.issuedCode}</p>
                                </div>
                                <div>
                                    <p>Дата выдачи: </p>
                                    <p>{resident.passport.issuedDate}</p>
                                </div>
                                <div>
                                    <p>Пол: </p>
                                    <p>{resident.passport.gender}</p>
                                </div>
                                <div>
                                    <p>Место рождения: </p>
                                    <p>{getBirthPlace()}</p>
                                </div>
                                <div>
                                    <p>Место регистрации: </p>
                                    <p>{getRegPlace()}</p>
                                </div>
                            </>
                            :
                            <h3>Не задано</h3>
                        }
                    </Modal>
                    <CustomButton onClick={() => {}}>Редактировать</CustomButton>
                    <CustomButton onClick={deleteResident}>Удалить</CustomButton>
                </div>
            </div>
        </div>
    )
}

export default ResidentCard;