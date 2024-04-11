import React, { FC, useEffect, useState } from 'react'
import { ICampus } from '../contracts/Contracts';
import CampusesService from '../api/CampusesService';
import Campus from '../components/campus/Campus';
import { AuthContext } from '../context/Context';

type HomeProps = {}

const Home: FC<HomeProps> = ({}) => {
    const [campus, setCampus] = useState<ICampus>();

    const fetchCampus = async () => {
        const response = await CampusesService.getCampus();
        setCampus(response);
    }

    useEffect(() => {
        fetchCampus()
    }, [])

  return (
    <>
        {
            campus
            ?
            <AuthContext.Consumer>
                {() => 
                    <Campus campus={campus} />
                }
            </AuthContext.Consumer>
            : <></>
        }
    </>
  )
}

export default Home;