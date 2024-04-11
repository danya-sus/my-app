import React, { FC } from 'react'
import { IEmployee } from '../../contracts/Contracts'
import Modal from '../ui/modal/Modal'
import CustomButton from '../ui/buttons/CustomButton'

type EmployeeCardProps = {
    employee: IEmployee
}

const EmployeeCard: FC<EmployeeCardProps> = ({employee}) => {
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
        <div>
            <div style={{display: 'flex'}}>
                {
                    employee.photoId
                    ?
                    <p>Photo</p>
                    :
                    <img src={require('../../images/default-profile-photo.png')} alt='Profile'/>
                }
            </div>
            <hr />
            <div>
                <h2>{getName()}</h2>
                <Modal title='Информация о работнике'>
                    <div>
                        <p>Профессия: </p>
                        <p>
                            {employee.professions.map((e) => e.name).join(', ')}
                        </p>
                    </div>
                    <div>
                        <p>Дата начала работы: </p>
                        <p>{employee.employmentDate}</p>
                    </div>
                    <div>
                        <p>Кампусы: </p>
                        <p>
                            {employee.campuses.map((e) => e.name).join(', ')}
                        </p>
                    </div>
                </Modal>
                <Modal title='Контактные данные'>
                    <div>
                        <p>Электроная почта: </p>
                        <p>{employee.email}</p>
                    </div>
                    <div>
                        <p>Номер телефона: </p>
                        <p>{employee.phoneNumber}</p>
                    </div>
                    <div>
                        <p>Номер телефона матери: </p>
                        <p>{employee.mothersPhoneNumber}</p>
                    </div>
                    <div>
                        <p>Номер телефона отца: </p>
                        <p>{employee.fathersPhoneNumber}</p>
                    </div>
                </Modal>
                <Modal title='Паспортные данные'>
                        {
                            employee.passport
                            ?
                            <>
                                <div>
                                    <p>Серия/номер паспорта: </p>
                                    <p>{employee.passport.passportSeries} {employee.passport.passportNumber}</p>
                                </div>
                                <div>
                                    <p>Выдан: </p>
                                    <p>{employee.passport.issuedBy}</p>
                                </div>
                                <div>
                                    <p>Код подразделения: </p>
                                    <p>{employee.passport.issuedCode}</p>
                                </div>
                                <div>
                                    <p>Дата выдачи: </p>
                                    <p>{employee.passport.issuedDate}</p>
                                </div>
                                <div>
                                    <p>Пол: </p>
                                    <p>{employee.passport.gender}</p>
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
                    <CustomButton onClick={() => {}}>Удалить</CustomButton>
            </div>
        </div>
    )
}
export default EmployeeCard;