import React, { FC, useEffect, useState } from 'react'
import ResidentsService from '../api/ResidentsService';
import { IResidend } from '../contracts/Contracts';
import ResidentList from '../components/residents/ResidentList';

const Residents: FC = () => {
    const [residents, setResidents] = useState<IResidend[]>([]);
    const [pagingInfo, setPagingInfo] = useState({
        total: 0,
        totalPages: 0,
        pageSize: 0,
        currentPage: 0
    });

    const fetchResidents = async (skip: number = 1, take: number = 10, deleted: boolean = false, filter?: {name: string, room: string, campus: string}) => {
        const response = await ResidentsService.getAll({PageNumber: skip, PageSize: take}, deleted, filter);

        if (response) {
            setResidents(response.data.value)
            setPagingInfo({
                total: response.total,
                totalPages: response.totalPages,
                pageSize: response.pageSize,
                currentPage: response.currentPage
            })
        }
    }

    useEffect(() => {
        fetchResidents()
    }, []);

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <ResidentList residents={residents} pagingParams={pagingInfo} fetchResidents={fetchResidents}/>
        </div>
    )
}

export default Residents;