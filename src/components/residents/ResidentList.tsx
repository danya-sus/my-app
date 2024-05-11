import React, { FC, useEffect, useState } from 'react'
import { ICampus, IResidend } from '../../contracts/Contracts'
import List from '../ui/list/List'
import ResidentListItem from './ResidentListItem'
import CustomInput from '../ui/input/CustomInput'
import CustomButton from '../ui/buttons/CustomButton'
import CampusesService from '../../api/CampusesService'
import CustomSelect from '../ui/select/CustomSelect'

type ResidentListProps = {
  residents: IResidend[],
  pagingParams: {
    total: number,
    totalPages: number,
    currentPage: number,
    pageSize: number
  },
  fetchResidents: (skip: number, take: number, deleted: boolean, filter: {name: string, room: string, campus: string}) => any
}

const ResidentList: FC<ResidentListProps> = (props) => {
  const [skipCount, setSkipCount] = useState(1);
  const [takeCount, setTakeCount] = useState(10);
  const [deleted, setDeleted] = useState(false);
  const [roomFilter, setRoomFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [campusFilter, setCampusFilter] = useState('');
  const [campuses, setCampuses] = useState<ICampus[]>();

  const fetchCampuses = async () => {
    const response = await CampusesService.getAll();

    if (response) {
      setCampuses(response);
    }
  }

  useEffect(() => {
    fetchCampuses()
  }, [])

  const setTakeCountHandler = async (value: number) => {
    setTakeCount(value)
    setSkipCount(1)
    await props.fetchResidents(1, value, deleted, {name: nameFilter, room: roomFilter, campus: campusFilter})
  }

  const setSkipCountHandler = async (name: string) => {
    switch (name) {
      case ('next') : {
        setSkipCount(skipCount + 1)
        await props.fetchResidents(skipCount + 1, takeCount, deleted, {name: nameFilter, room: roomFilter, campus: campusFilter})
        break;
      }
      case ('next-last') : {
        setSkipCount(props.pagingParams.totalPages)
        await props.fetchResidents(props.pagingParams.totalPages, takeCount, deleted, {name: nameFilter, room: roomFilter, campus: campusFilter})
        break;
      }
      case ('prev') : {
        setSkipCount(skipCount - 1)
        await props.fetchResidents(skipCount - 1, 10, deleted, {name: nameFilter, room: roomFilter, campus: campusFilter})
        break;
      }
      case ('prev-last') : {
        setSkipCount(1)
        await props.fetchResidents(1, takeCount, deleted, {name: nameFilter, room: roomFilter, campus: campusFilter})
        break;
      }
    }
  }

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex'}}>
          <CustomInput placeholder='Введите комнату' onChange={(e) => setRoomFilter(e.target.value)} />
          <CustomInput placeholder='Введите ФИО' onChange={(e) => setNameFilter(e.target.value)} />
        </div>
        {
          campuses
          ?
          <CustomSelect children={campuses.map(e => {return {id: e.id, value: e.name}})} value={campuses[0].name} onChange={(e) => setCampusFilter(e.target.value)}/>
          :
          <></>
        }
        <h4>Удалённые проживающие: </h4>
        <input 
          type='checkbox' 
          onChange={(e) => setDeleted(e.target.checked)}
        />
        <CustomButton onClick={() => 
          {
            setSkipCount(1);
            setTakeCount(10);
            props.fetchResidents(1, 10, deleted, {name: nameFilter, room: roomFilter, campus: campusFilter})
          }
        }>Поиск</CustomButton>
      </div>
      <List 
        headers={['Фамилия', 'Имя', 'Отчество', 'Общежитие', 'Комната', '']} 
        paging={
          {
            total: props.pagingParams.total,
            totalPages: props.pagingParams.totalPages,
            currentPage: props.pagingParams.currentPage,
            pageSize: props.pagingParams.pageSize,
            takeCount: takeCount,
            skipCount: skipCount,
            setTakeCount: (value: string) => setTakeCountHandler(parseInt(value)),
            setSkipCount: ((name: string) => setSkipCountHandler(name))
          }
        }
        items={props.residents} 
        renderItem={(resident: IResidend) => <ResidentListItem key={resident.id} resident={resident}/>} 
      />
    </div>
  )
}

export default ResidentList;