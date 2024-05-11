import React, { FC, useState } from 'react'
import { IRoom } from '../../contracts/Contracts'
import BlockCardRoom from './BlockCardRoom';
import classes from './Rooms.module.css';

type BlockCardProps = {
    rooms: IRoom[];
    blockNum: number,
    updateRoom: (room: IRoom) => void
}

const BlockCard: FC<BlockCardProps> = ({...props}) => {
    const [room, setRoom] = useState<IRoom>();

    return (
        <div style={{backgroundColor: 'white'}}>
            <h2>Блок {props.blockNum}</h2>
            {
                props.rooms.map((e) => <p onClick={() => setRoom(e)} key={e.id}>{e.block}{e.blockCode}</p>)
            }
            {
                room
                ?
                <BlockCardRoom room={room} updateRoom={props.updateRoom}/>
                :
                <></>
            }
        </div>
    )
}

export default BlockCard;