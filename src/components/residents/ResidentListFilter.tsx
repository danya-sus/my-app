import React, { FC } from 'react'
import CustomButton from '../ui/buttons/CustomButton'
import CustomSelect from '../ui/select/CustomSelect'
import CustomInput from '../ui/input/CustomInput'
import { ICampus } from '../../contracts/Contracts'

type ResidentListFilterProps = {
    campuses: ICampus[] | undefined,
    setRoomFilter: (value: string) => void,
    setNameFilter: (value: string) => void,
    setCampusFilter: (value: string) => void,
    setDeleted: (value: boolean) => void,
    setSkipCount: (value: number) => void,
    setTakeCount: (value: number) => void,
    fetchResidents: () => void
}

const ResidentListFilter: FC<ResidentListFilterProps> = ({...props}) => {
    return (
        <div style={{display: 'flex'}}>
            <div style={{display: 'flex'}}>
                <CustomInput placeholder='Введите комнату' onChange={(e) => props.setRoomFilter(e.target.value)} />
                <CustomInput placeholder='Введите ФИО' onChange={(e) => props.setNameFilter(e.target.value)} />
            </div>
            {
                props.campuses
                ?
                <CustomSelect 
                    children={props.campuses.map(e => {return {id: e.id, value: e.name}})} 
                    value={props.campuses[0].name} 
                    onChange={(e) => props.setCampusFilter(e.target.value)}
                />
                :
                <></>
            }
            <h4>Удалённые проживающие: </h4>
            <input 
                type='checkbox' 
                onChange={(e) => props.setDeleted(e.target.checked)}
            />
            <CustomButton onClick={() => 
                {
                    props.setSkipCount(1);
                    props.setTakeCount(10);
                    props.fetchResidents();
                }
            }>Поиск</CustomButton>
        </div>
    )
}

export default ResidentListFilter;