import React, { FC } from 'react'
import { IRequest } from '../../contracts/Contracts'
import CustomButton from '../ui/buttons/CustomButton'

type RequestListItemProps = {
  request: IRequest,
  deleteRequest: (id: string) => {},
}

const RequestListItem: FC<RequestListItemProps> = ({request, deleteRequest}) => {
  const getEmployeeName = () => {
    if (request.employee) {
      return `${request.employee.lastName} ${request.employee.firstName} ${request.employee.middleName}`.trim()
    }
    return 'не назначен'
  }

  const getStatus = () => {
    switch (request.requestStatus) {
      case (0) : return 'Создана'
      case (1) : return 'Отправлена'
      case (2) : return 'На рассмотрении'
      case (3) : return 'Отменена'
      case (4) : return 'В работе'
      case (5) : return 'Завершена'
    }
  }

  return (
    <div>
      <h3>{request.title}</h3>
      <div>
        <div>
          <h4>Описание</h4>
          <p>{request.description}</p>
        </div>
        <div>
          <p>Тип заявки: {request.requestType.name}</p>
        </div>
      </div>
      <div>
        <h4>Ход работы</h4>
        <div>
          <p>Статус: {getStatus()}</p>
          <p>Дата создания: {request.createdDate}</p>
          <p>Дата закрытия: {request.closedDate ? request.closedDate : '-'}</p>
        </div>
        <div>
          <p>Работник: {getEmployeeName()}</p>
          {
            request.employee
            ?
            <p>Контактные данные: тел.: {request.employee.phoneNumber}, E-mail: {request.employee.email}</p>
            : <></>
          }
        </div>
      </div>
      <CustomButton onClick={() => deleteRequest(request.id)}>Удалить</CustomButton>
      <CustomButton onClick={() => {}}>Редактировать</CustomButton>
    </div>
  )
}

export default RequestListItem;