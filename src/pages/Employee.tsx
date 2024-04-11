import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { IEmployee } from '../contracts/Contracts'
import EmployeesService from '../api/EmployeesService'
import CustomButton from '../components/ui/buttons/CustomButton'
import EmployeeCard from '../components/employees/EmployeeCard'

type EmployeeProps = {
    id: string
}

const Employee: FC = ({}) => {
    const {id} = useParams<EmployeeProps>();
    const [employee, setEmployee] = useState<IEmployee>();
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const fetchEmployee = async () => {
        if (id !== undefined) {
            var response = await EmployeesService.getById(id);
            if (response) {
                setEmployee(response)
            }
        }
    }

    useEffect(() => {
        fetchEmployee()
    }, [])

    return (
        <>
            {
                employee
                ?
                <>
                    <CustomButton onClick={goBack}>Назад</CustomButton>
                    <EmployeeCard employee={employee} />
                </>
                :
                <></>
            }
        </>
    )
}

export default Employee;