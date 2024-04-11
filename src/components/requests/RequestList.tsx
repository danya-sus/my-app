import React, { FC, useState } from 'react'
import { IAddRequest, IRequest } from '../../contracts/Contracts'
import RequestListItem from './RequestListItem'
import CustomButton from '../ui/buttons/CustomButton'
import ModalWindow from '../ui/modal/ModalWindow'
import NewRequest from './NewRequest'
import RequestsService from '../../api/RequestService'

type RequestListProps = {
    requests: IRequest[],
    pagingParams: {
        total: number,
        totalPages: number,
        currentPage: number,
        pageSize: number
    },
    fetchRequests: (skip: number, take: number) => any
}

const RequestList: FC<RequestListProps> = ({...props}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const sendNewRequest = async (newRequest: IAddRequest) => {
        const response = await RequestsService.addRequest(newRequest);

        if (!response) {
            alert('Что-то пошло не так')
        }
        else {
            props.fetchRequests(1, 100);
        }
    }

    const deleteRequest = async (id: string) => {
        const response = await RequestsService.deleteRequest(id);

        if (response) {
            props.fetchRequests(1, 100);
        }
    }

    return (
        <div>
            <CustomButton onClick={() => setModalVisible(true)}>Добавить</CustomButton>
            {
                props.requests.map((request: IRequest) => 
                    <RequestListItem 
                        key={request.id} 
                        request={request}
                        deleteRequest={deleteRequest}
                    />)
            }
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