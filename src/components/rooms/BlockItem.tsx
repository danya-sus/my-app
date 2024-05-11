import React, { FC, useState } from 'react'
import { IRoom } from '../../contracts/Contracts'
import ModalWindow from '../ui/modal/ModalWindow'
import BlockCard from './BlockCard'

type BlockItemProps = {
    rooms: IRoom[],
    updateRoom: (room: IRoom) => void
}

const BlockItem: FC<BlockItemProps> = ({...props}) => {
    const [visisble, setVisible] = useState(false);
    return (
        <>
            {
                props.rooms.length !== 0
                ?
                <>
                    <p onClick={() => setVisible(true)}>{props.rooms[0].block}</p>
                    <ModalWindow visible={visisble} setVisible={() => setVisible(false)}>
                        <BlockCard rooms={props.rooms} blockNum={props.rooms[0].block} updateRoom={props.updateRoom}/>
                    </ModalWindow>
                </>
                :
                <></>
            }
        </>
    )
}

export default BlockItem;