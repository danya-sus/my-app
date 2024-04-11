import React, { FC, useState } from 'react'
import { IResidend } from '../../contracts/Contracts'
import List from '../ui/list/List'
import ResidentListItem from './ResidentListItem'

type ResidentListProps = {
  residents: IResidend[],
  pagingParams: {
    total: number,
    totalPages: number,
    currentPage: number,
    pageSize: number
  },
  fetchResidents: (skip: number, take: number) => any
}

const ResidentList: FC<ResidentListProps> = (props) => {
  const [skipCount, setSkipCount] = useState(1);
  const [takeCount, setTakeCount] = useState(10);

  const setTakeCountHandler = async (value: number) => {
    setTakeCount(value)
    setSkipCount(1)
    await props.fetchResidents(1, value)
  }

  const setSkipCountHandler = async (name: string) => {
    switch (name) {
      case ('next') : {
        setSkipCount(skipCount + 1)
        await props.fetchResidents(skipCount + 1, takeCount)
        break;
      }
      case ('next-last') : {
        setSkipCount(props.pagingParams.totalPages)
        await props.fetchResidents(props.pagingParams.totalPages, takeCount)
        break;
      }
      case ('prev') : {
        setSkipCount(skipCount - 1)
        await props.fetchResidents(skipCount - 1, 10)
        break;
      }
      case ('prev-last') : {
        setSkipCount(1)
        await props.fetchResidents(1, takeCount)
        break;
      }
    }
  }

  return (
    <div>
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
            setTakeCount: (value: React.ChangeEvent<HTMLSelectElement>) => setTakeCountHandler(parseInt(value.target.value)),
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