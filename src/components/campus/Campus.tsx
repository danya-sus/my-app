import React, { FC, useContext } from 'react'
import { ICampus } from '../../contracts/Contracts'
import { AuthContext } from '../../context/Context'

type CampusProps = {
  campus: ICampus
}

const Campus: FC<CampusProps> = ({...props}) => {
  const {user} = useContext(AuthContext);
  console.log(user);

  const getAddress = () => {
    let address = props.campus.address;
    return `${address.country}, г. ${address.town}, ул. ${address.street}, д. ${address.house}, к. ${address.corps}`
  }

  return (
    <>
      <h1>{props.campus.name}</h1>
      <h3>Адрес: {getAddress()}</h3>
      <div dangerouslySetInnerHTML={{__html: props.campus.htmlInfo}}/>
    </>
  )
}

export default Campus;