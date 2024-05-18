import React, { FC, useEffect, useState } from 'react'
import { ICampus, IResidend } from '../../contracts/Contracts'
import List from '../ui/list/List'
import ResidentListItem from './ResidentListItem'
import CampusesService from '../../api/CampusesService'
import ResidentListFilter from './ResidentListFilter'
import classes from './Residents.module.css'

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
    <div className={classes.list}>
      <ResidentListFilter 
        campuses={campuses}
        setRoomFilter={setRoomFilter}
        setNameFilter={setNameFilter}
        setCampusFilter={setCampusFilter}
        setDeleted={setDeleted}
        setSkipCount={setSkipCount}
        setTakeCount={setTakeCount}
        fetchResidents={() => props.fetchResidents(1, 10, deleted, {name: nameFilter, room: roomFilter, campus: campusFilter})}
      />
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