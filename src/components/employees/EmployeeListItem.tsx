import React, { FC } from 'react'
import { IEmployee } from '../../contracts/Contracts'
import { Link } from 'react-router-dom'
import LinkButton from '../ui/buttons/LinkButton'

type EmployeeListItemProps = {
    employee: IEmployee
}

const EmployeeListItem: FC<EmployeeListItemProps> = ({...props}) => {
  return (
    <tr>
        <td><p>{props.employee.lastName}</p></td>
        <td><p>{props.employee.firstName}</p></td>
        <td><p>{props.employee.middleName}</p></td>
        <td><p>{props.employee.campuses.map((e) => e.name).join(', ')}</p></td>
        <td><p>{props.employee.professions.map((e) => e.name).join(', ')}</p></td>
        <td>
            <Link to={`/employees/${props.employee.id}`}>
                <LinkButton>Подробнее</LinkButton>
            </Link>
        </td>
    </tr>
  )
}

export default EmployeeListItem;