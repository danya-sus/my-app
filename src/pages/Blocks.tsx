import React, { FC, useEffect, useState } from 'react'
import { IRoom } from '../contracts/Contracts'
import RoomsService from '../api/RoomsService';
import BlocksTable from '../components/rooms/BlocksTable';

const Blocks: FC = () => {
    const [rooms, setRooms] = useState<IRoom[]>();

    const fetchRooms = async () => {
        const response = await RoomsService.getAll({PageNumber: 1, PageSize: 100000});

        if (response?.data.value) {
            setRooms(response.data.value)
        }
    }

    useEffect(() => {
        fetchRooms()
    }, [])

    return (
        <div style={
            {
                display:'flex', 
                flexDirection:'column', 
                justifyContent:'center', 
                alignItems:'center'
            }
        }>
            <div>
                <h3>Блоки</h3>
                {
                    rooms
                    ?
                    <BlocksTable rooms={rooms} />
                    :
                    <p>Ничего не найдено</p>
                }
            </div>
        </div>
    )
}

export default Blocks;