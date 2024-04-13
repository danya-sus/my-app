import React, { FC, useEffect, useState } from 'react'
import { IAddRequest, IRequest, IRequestType } from '../../contracts/Contracts'
import RequestTypesService from '../../api/RequestTypesService'
import CustomInput from '../ui/input/CustomInput'
import TextAreaInput from '../ui/input/TextAreaInput'
import RequestsService from '../../api/RequestService'
import CustomSelect from '../ui/select/CustomSelect'
import CustomButton from '../ui/buttons/CustomButton'

type RequestRedactFormProps = {
    request: IRequest
}

const RequestRedactForm: FC<RequestRedactFormProps> = ({...props}) => {
    const [requestTypes, setRequestTypes] = useState<IRequestType[]>();
    const [title, setTitle] = useState(props.request.title);
    const [description, setDescription] = useState(props.request.description);
    const [type, setType] = useState(props.request.typeId);

    const fetchRequestTypes = async() => {
        const response = await RequestTypesService.getAll({PageNumber: 1, PageSize: 100});

        if(response) {
            setRequestTypes(response);
        }
    }

    const saveRequest = async () => {
        if (title && description && type !== 'Укажите тип' && requestTypes) {
            const typeId = requestTypes.find(e => e.name === type)?.id;
            if (typeId) {
                if (await RequestsService.updateRequest({id: props.request.id, title: title, description: description, typeId: typeId})) {
                    props.request.title = title;
                    props.request.description = description;
                    props.request.typeId = typeId
                }
            }
        }
    }

    useEffect(() => {
        fetchRequestTypes()
    }, [])

    return (
        <div>
            {
                requestTypes
                ?
                <>
                    <CustomInput 
                        placeholder='Введите значение' 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
                    />
                    <TextAreaInput 
                        placeholder='Введите значение' 
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} 
                    />
                    <CustomSelect 
                        value='Укажите тип' 
                        children={['Укажите тип', ...requestTypes.map(e => e.name)]} 
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
                    />
                    <CustomButton onClick={saveRequest}>Отправить</CustomButton>
                </>
                :
                <></>
            }
        </div>
    )
}

export default RequestRedactForm;