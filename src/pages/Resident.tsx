import React, { FC, useEffect, useState } from 'react'
import { IResidend } from '../contracts/Contracts'
import ResidentsService from '../api/ResidentsService'
import { useNavigate, useParams } from 'react-router'
import ResidentCard from '../components/residents/ResidentCard'
import CustomButton from '../components/ui/buttons/CustomButton'

type ResidentProps = {
    id: string
}

const Resident: FC = ({}) => {
    const {id} = useParams<ResidentProps>();
    const [resident, setResident] = useState<IResidend>();
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const fetchResidents = async () => {
        if (id !== undefined) {
            var response = await ResidentsService.getById(id);
            setResident(response)
        }
    }

    useEffect(() => {
        fetchResidents()
    }, [])
    
    return (
        <>
            {
                resident
                ? 
                <>
                    <CustomButton onClick={goBack}>Back</CustomButton>
                    <ResidentCard resident={resident} />
                </>
                :
                <></>
            }
        </>
    )
}

export default Resident;