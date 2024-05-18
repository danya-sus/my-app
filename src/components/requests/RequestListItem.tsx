import React, { FC, useState } from 'react'
import { IRequest } from '../../contracts/Contracts'
import CustomButton from '../ui/buttons/CustomButton'
import ModalWindow from '../ui/modal/ModalWindow'
import RequestRedactForm from './RequestRedactForm'
import RequestsService from '../../api/RequestService'
import classes from './Requests.module.css'

type RequestListItemProps = {
  request: IRequest,
}

const RequestListItem: FC<RequestListItemProps> = ({request}) => {
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

  const nextStatus = () => {
    switch (request.requestStatus) {
      case (0) : return 1
      case (1) : return 2
      case (2) : return 4
      case (3) : return 2
      case (4) : return 5
      case (5) : return 5
    }
  }

  const getDate = (dateString: string) => new Date(dateString).toLocaleDateString() + ':' + new Date(dateString).toLocaleTimeString();

  return (
    <div className={classes.list__body__item}>
      <h2>{request.title}</h2>
      <div>
        <div>
          <h4>Описание:</h4>
          <p>{request.description}</p>
        </div>
        <hr />
        <div>
          <p>Тип заявки: {request.requestType.name}</p>
        </div>
      </div>
      <hr />
      <div>
        <h4>Ход работы</h4>
        <div>
          <p>Дата создания: {getDate(request.createdDate)}</p>
          <p>Дата закрытия: {request.closedDate ? getDate(request.closedDate) : '-'}</p>
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
        <hr />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignContent: 'center', gridGap:'10px'}}>
            <h4 style={{margin: '0 0'}}>Статус</h4>
            <p style={{margin: '0 0'}}>{getStatus()}</p>
          </div>
          <CustomButton 
            onClick={() => updateStatus(nextStatus()!)}
            backgroundColor='rgb(0, 185, 9)'
            color='white'
          >Продвинуть</CustomButton>
        </div>
      </div>
      <div className={classes.list__body__item__btns}>
        <CustomButton 
          onClick={() => updateStatus(3)}
          backgroundColor='rgb(236, 0, 0)'
          color='white'
        >Отклонить</CustomButton>
        <CustomButton 
          onClick={() => setVisible(true)}
          backgroundColor='grey'
          color='white'
        >Редактировать</CustomButton>
      </div>
      <ModalWindow visible={visible} setVisible={() => setVisible(false)}>
        <RequestRedactForm request={request}/>
      </ModalWindow>
    </div>
  )
}

export default RequestListItem;