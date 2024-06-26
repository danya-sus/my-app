import React, { FC, useEffect, useState } from 'react'
import { IRequest, IRequestType } from '../../contracts/Contracts'
import RequestTypesService from '../../api/RequestTypesService'
import CustomInput from '../ui/input/CustomInput'
import TextAreaInput from '../ui/input/TextAreaInput'
import RequestsService from '../../api/RequestService'
import CustomSelect from '../ui/select/CustomSelect'
import CustomButton from '../ui/buttons/CustomButton'
import classes from './Requests.module.css'

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
            if (await RequestsService.updateRequest({id: props.request.id, title: title, description: description, typeId: type})) {
                props.request.title = title;
                props.request.description = description;
                props.request.typeId = type
            }
        }
    }

    useEffect(() => {
        fetchRequestTypes()
    }, [])

    return (
        <div className={classes.redactForm}>
            {
                requestTypes
                ?
                <>
                    <CustomInput 
                        placeholder='Введите значение' 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
                        preinputtext={props.request.title}
                    />
                    <div className={classes.redactForm__textArea}>
                        <TextAreaInput 
                            placeholder='Введите значение' 
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} 
                            value={props.request.description}
                        />
                    </div>
                    <div className={classes.redactForm__select}>
                        <CustomSelect 
                            value={requestTypes.filter(e => e.id === props.request.typeId)[0].name}
                            children={[{id: 'default', value: 'Укажите тип'}, ...requestTypes.map(e => {return {id: e.id, value: e.name}})]} 
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.id)}
                        />
                    </div>
                    <div className={classes.redactForm__btn}>
                        <CustomButton 
                            onClick={saveRequest}
                            backgroundColor='rgb(0, 185, 9)'
                            color='white'
                        >Отправить</CustomButton>
                    </div>
                </>
                :
                <></>
            }
        </div>
    )
}

export default RequestRedactForm;