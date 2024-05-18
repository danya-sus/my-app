import React, { FC } from 'react'
import CustomButton from '../ui/buttons/CustomButton'
import CustomSelect from '../ui/select/CustomSelect'
import CustomInput from '../ui/input/CustomInput'
import { ICampus } from '../../contracts/Contracts'
import classes from './Residents.module.css';

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
        <div className={classes.list__filter}>
            <div className={classes.list__filter__inputs}>
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
            <div className={classes.list__filter__deleted}>
                <h4>Удалённые проживающие: </h4>
                <input 
                    type='checkbox' 
                    onChange={(e) => props.setDeleted(e.target.checked)}
                />
            </div>
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