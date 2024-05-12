import React, { FC, useEffect, useState } from 'react'
import { IEmployee } from '../contracts/Contracts';
import EmployeesService from '../api/EmployeesService';
import EmployeeList from '../components/employees/EmployeeList';

const Employees: FC = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [pagingInfo, setPagingInfo] = useState({
    total: 0,
    totalPages: 0,
    pageSize: 0,
    currentPage: 0
  });

  const fetchEmployees = async (skip: number = 1, take: number = 10) => {
    const response = await EmployeesService.getAll({PageNumber: skip, PageSize: take});

    if (response) {
      setEmployees(response.data.value)
      setPagingInfo({
        total: response.total,
        totalPages: response.totalPages,
        pageSize: response.pageSize,
        currentPage: response.currentPage
      })
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <EmployeeList employees={employees} pagingParams={pagingInfo} fetchEmployees={fetchEmployees} />
  )
}

export default Employees;