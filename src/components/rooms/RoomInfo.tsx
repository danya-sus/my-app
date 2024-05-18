import React, { FC } from 'react'
import { IRoom } from '../../contracts/Contracts'
import classes from './Rooms.module.css'

type RoomInfoProps = {
    room: IRoom
}

const RoomInfo: FC<RoomInfoProps> = ({room}) => {
    const getDate = (dateString: string) => new Date(dateString).toLocaleDateString();

    return (
        <div className={classes.residentRoom}>
            <div>
                <h3>{room.block}{room.blockCode}</h3>
            </div>
            <hr />
            <div>
                <div className={classes.residentRoom__item}>
                    <p>Рейтинг комнаты:</p>
                    <p>{room.roomRating}</p>
                </div>
                <div className={classes.residentRoom__item}>
                    <p>Дата ремонта:</p>
                    <p>{getDate(room.repairDate)}</p>
                </div>
                <div>
                    <p>Замечания:</p>
                    {
                        room.remarks
                        ?
                        <p>{room.remarks}</p>
                        :
                        <p>Не найдено</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default RoomInfo;