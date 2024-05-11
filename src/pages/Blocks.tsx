import React, { FC, useEffect, useState } from 'react'
import { IRoom } from '../contracts/Contracts'
import RoomsService from '../api/RoomsService';
import BlocksTable from '../components/rooms/BlocksTable';

type BlocksProps = {}

const Blocks: FC<BlocksProps> = () => {
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
        <>
            <h3>Блоки</h3>
            {
                rooms
                ?
                <BlocksTable rooms={rooms} />
                :
                <p>Ничего не найдено</p>
            }
        </>
    )
}

export default Blocks;