import React, { FC, useState } from 'react'
import { ICampus } from '../../contracts/Contracts'
import CustomSelect from '../ui/select/CustomSelect'
import classes from './Campus.module.css'

type CampusProps = {
  campuses: ICampus[]
}

const Campus: FC<CampusProps> = ({...props}) => {
  const [selectedCampus, setSelectedCampus] = useState<ICampus>(props.campuses[0])
    
  const getAddress = () => {
    let address = selectedCampus.address;
    return `${address.country}, г. ${address.town}, ул. ${address.street}, д. ${address.house}, к. ${address.corps}`
  }

  return (
    <div className={classes.campus}>
      <div>
        <div className={classes.campus__select}>
          <h4>Выберите общежитие: </h4>
          <CustomSelect
            value={props.campuses[0].name} 
            children={props.campuses.map((e) =>  {return {id: e.id, value: e.name}})} 
            onChange={(e) => setSelectedCampus(props.campuses.filter(x => x.id === e.target.selectedOptions[0].id)[0])}
          />
        </div>
        <h1>{selectedCampus.name}</h1>
        <h3>Адрес: {getAddress()}</h3>
        <div dangerouslySetInnerHTML={{__html: selectedCampus.htmlInfo}}/>
      </div>
    </div>
  )
}

export default Campus;