import React, { FC } from 'react'
import { IResidend } from '../../contracts/Contracts'
import LinkButton from '../ui/buttons/LinkButton'
import { Link } from 'react-router-dom'

type ResidentListItemProps = {
    resident: IResidend
}

const ResidentListItem: FC<ResidentListItemProps> = ({...props}) => {
  return (
    <tr>
        <td><p>{props.resident.lastName}</p></td>
        <td><p>{props.resident.firstName}</p></td>
        <td><p>{props.resident.middleName}</p></td>
        <td><p>{props.resident.campus.name}</p></td>
        <td><p>{props.resident.room.block}{props.resident.room.blockCode}</p></td>
        <td>
          <Link to={`/residents/${props.resident.id}`}>
            <LinkButton>Подробнее</LinkButton>
          </Link>
        </td>
    </tr>
  )
}

export default ResidentListItem;