import React, { FC, useState } from 'react'
import { IRequest } from '../../contracts/Contracts'
import CustomButton from '../ui/buttons/CustomButton'
import ModalWindow from '../ui/modal/ModalWindow'
import RequestRedactForm from './RequestRedactForm'
import RequestsService from '../../api/RequestService'

type RequestListItemProps = {
  request: IRequest,
  deleteRequest: (id: string) => {},
}

const RequestListItem: FC<RequestListItemProps> = ({request, deleteRequest}) => {
  const [visible, setVisible] = useState(false);
  const [, setStatus] = useState(1);

  const getEmployeeName = () => {
    if (request.employee) {
      return `${request.employee.lastName} ${request.employee.firstName} ${request.employee.middleName}`.trim()
    }
    return 'не назначен'
  }

  const updateStatus = async (newStatusCode: number) => {
    var response = await RequestsService.updateRequestStatus(request.id, newStatusCode);

    if (response) {
      request.requestStatus = newStatusCode
      setStatus(newStatusCode)
    }
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
        <div>
          <h4>Статус</h4>
          <p>{getStatus()}</p>
          <CustomButton onClick={() => updateStatus(2)}>Продвинуть</CustomButton>
        </div>
      </div>
      <CustomButton onClick={() => updateStatus(3)}>Отменить</CustomButton>
      <CustomButton onClick={() => setVisible(true)}>Редактировать</CustomButton>
      <ModalWindow visible={visible} setVisible={() => setVisible(false)}>
        <RequestRedactForm request={request}/>
      </ModalWindow>
    </div>
  )
}

export default RequestListItem;