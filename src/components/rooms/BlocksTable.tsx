import React, { FC, useState } from 'react'
import { IRoom } from '../../contracts/Contracts'
import BlockItem from './BlockItem'
import classes from './Rooms.module.css'

type BlocksTableProps = {
    rooms: IRoom[]
}

const BlocksTable: FC<BlocksTableProps> = ({...props}) => {
    const [rooms, setRooms] = useState<IRoom[]>(props.rooms);

    function getRoom(rooms: IRoom[], block: number) {
        return rooms.filter(e => e.block % 100 === block);
    }
    
    function getBlocksByFloor(rooms: IRoom[], floor: number) {
        return rooms.filter(e => Math.floor(e.block / 100) === floor);
    }
    
    function* getBlocks(rooms: IRoom[]) {
        for (let i = 1; i < 11; i++) {
            yield (
                <td key={i}>
                    {
                        <BlockItem 
                            rooms={getRoom(rooms, i)} 
                            updateRoom={e => setRooms([...props.rooms.filter(r => r.id !== e.id), e])} 
                        />
                    }
                </td>
            )
        }
    }
    
    function* getFloors(rooms: IRoom[]) {
        for (let i = 16; i > 1; i--) {
            yield (
                <tr key={i}>
                    <td><span style={{fontWeight:'bolder'}}>Этаж {i}</span></td>
                    {Array.from(getBlocks(getBlocksByFloor(rooms, i)))}
                </tr>
            )
        }
    }

    return (
        <div className={classes.rooms}>
            <table>
                <tbody>
                    {[Array.from(getFloors(rooms))]}
                </tbody>
            </table>
        </div>
    )
}

export default BlocksTable;