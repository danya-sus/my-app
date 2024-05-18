import React, { FC, useEffect, useState } from 'react'
import { ICampus } from '../contracts/Contracts';
import CampusesService from '../api/CampusesService';
import Campus from '../components/campus/Campus';
import { AuthContext } from '../context/Context';

const Home: FC = () => {
    const [campus, setCampus] = useState<ICampus[]>();

    const fetchCampus = async () => {
        const response = await CampusesService.getAll();
        setCampus(response);
    }

    useEffect(() => {
        fetchCampus()
    }, [])

  return (
    <div style={
        {
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignContent: 'center'
        }
    }>
        {
            campus
            ?
            <AuthContext.Consumer>
                {() => 
                    <Campus campuses={campus} />
                }
            </AuthContext.Consumer>
            : <></>
        }
    </div>
  )
}

export default Home;