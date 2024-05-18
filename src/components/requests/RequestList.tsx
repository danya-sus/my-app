import React, { FC, useState } from 'react'
import { IAddRequest, IRequest } from '../../contracts/Contracts'
import RequestListItem from './RequestListItem'
import CustomButton from '../ui/buttons/CustomButton'
import ModalWindow from '../ui/modal/ModalWindow'
import NewRequest from './NewRequest'
import RequestsService from '../../api/RequestService'
import CustomInput from '../ui/input/CustomInput'
import classes from './Requests.module.css'

type RequestListProps = {
    requests: IRequest[],
    pagingParams: {
        total: number,
        totalPages: number,
        currentPage: number,
        pageSize: number
    },
    residentRequests: boolean,
    fetchRequests: (skip: number, take: number, room?: string) => any
}

const RequestList: FC<RequestListProps> = ({...props}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [roomFilter, setRoomFilter] = useState('');

    const sendNewRequest = async (newRequest: IAddRequest) => {
        const response = await RequestsService.addRequest(newRequest);

        if (!response) {
            alert('Что-то пошло не так')
        }
        else {
            props.fetchRequests(1, 100);
        }
    }

    return (
        <div className={classes.list}>
            {
                props.residentRequests
                ?
                <CustomButton onClick={() => setModalVisible(true)}>Добавить</CustomButton>
                :
                <div className={classes.list__filter}>
                    <CustomInput placeholder='Введите комнату' onChange={(e) => {setRoomFilter(e.target.value)}} />
                    <CustomButton onClick={() => {props.fetchRequests(1, 100, roomFilter)}}>Поиск</CustomButton>
                </div>
            }
            <div className={classes.list__body}>
                {
                    props.requests.map((request: IRequest) => 
                        <RequestListItem 
                            key={request.id} 
                            request={request}
                        />)
                }
            </div>
            <ModalWindow 
                visible={modalVisible} 
                setVisible={() => setModalVisible(false)}
            >
                <NewRequest sendNewRequest={sendNewRequest} /> 
            </ModalWindow>
        </div>
    )
}

export default RequestList;