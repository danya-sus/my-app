import React, { FC, useState } from 'react'
import { IEmployee } from '../../contracts/Contracts'
import List from '../ui/list/List'
import EmployeeListItem from './EmployeeListItem'

type EmployeeListProps = {
    employees: IEmployee[],
    pagingParams: {
        total: number,
        totalPages: number,
        currentPage: number,
        pageSize: number
    },
    fetchEmployees: (skip: number, take: number) => any
}

const EmployeeList: FC<EmployeeListProps> = (props) => {
    const [skipCount, setSkipCount] = useState(1);
    const [takeCount, setTakeCount] = useState(10);

    const setTakeCountHandler = async (value: number) => {
        setTakeCount(value)
        setSkipCount(1)
        await props.fetchEmployees(1, value)
    }

    const setSkipCountHandler = async (name: string) => {
        switch (name) {
        case ('next') : {
            setSkipCount(skipCount + 1)
            await props.fetchEmployees(skipCount + 1, takeCount)
            break;
        }
        case ('next-last') : {
            setSkipCount(props.pagingParams.totalPages)
            await props.fetchEmployees(props.pagingParams.totalPages, takeCount)
            break;
        }
        case ('prev') : {
            setSkipCount(skipCount - 1)
            await props.fetchEmployees(skipCount - 1, 10)
            break;
        }
        case ('prev-last') : {
            setSkipCount(1)
            await props.fetchEmployees(1, takeCount)
            break;
        }
        }
    }
    return (
        <div>
            <List
                headers={['Фамилия', 'Имя', 'Отчество', 'Общежития', 'Профессия', '']}
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
                items={props.employees}
                renderItem={(employee: IEmployee) => <EmployeeListItem key={employee.id} employee={employee}/>}
            />
        </div>
    )
}

export default EmployeeList;