import React, { FC, useEffect, useState } from 'react'
import { IAddRequest, IRequestType } from '../../contracts/Contracts'
import RequestTypesService from '../../api/RequestTypesService';
import CustomSelect from '../ui/select/CustomSelect';
import CustomInput from '../ui/input/CustomInput';
import TextAreaInput from '../ui/input/TextAreaInput';
import CustomButton from '../ui/buttons/CustomButton';
import classes from './Requests.module.css';

type NewRequestProps = {
    sendNewRequest: (request: IAddRequest) => any
}

const NewRequest: FC<NewRequestProps> = ({...props}) => {
    const [requestTypes, setRequestTypes] = useState<IRequestType[]>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');

    const fetchRequestTypes = async () => {
        const response = await RequestTypesService.getAll({PageNumber: 1, PageSize: 100});

        if (response) {
            setRequestTypes(response)
        }
    }

    const sendRequest = () => {
        if (title && description && type !== 'Укажите тип' && requestTypes) {
            props.sendNewRequest({
                id: crypto.randomUUID(),
                title: title,
                description: description,
                typeId: type
            })
        }
    }

    useEffect(() => {
        fetchRequestTypes()
    }, [])

    return (
        <div className={classes.newRequest}>
            {
                requestTypes
                ?
                <>
                    <h3>Новая заявка</h3>
                    <div>
                        <div>
                            <p>Название: </p>
                            <CustomInput 
                                placeholder='Укажите название' 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
                            />
                        </div>
                        <div>
                            <p>Описание заявки: </p>
                            <TextAreaInput
                                placeholder='Введите описание'
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} 
                            />
                        </div>
                        <div>
                            <p>Тип заявки: </p>
                            <CustomSelect 
                                value='Укажите тип' 
                                children={[{id: 'default', value: 'Укажите тип'}, ...requestTypes.map(e => {return {id: e.id, value: e.name}})]} 
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.selectedOptions[0].id)}
                            />
                        </div>
                    </div>
                    <div className={classes.newRequest__btns}>
                        <CustomButton backgroundColor='rgb(0, 185, 9)' color='white' onClick={sendRequest}>Отправить</CustomButton>
                    </div>
                </>
                : <></>
            }
        </div>
    )
}

export default NewRequest;