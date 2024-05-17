import React, { FC } from 'react'
import { IRoom } from '../../contracts/Contracts'

type RoomInfoProps = {
    room: IRoom
}

const RoomInfo: FC<RoomInfoProps> = ({room}) => {
    const getDate = (dateString: string) => new Date(dateString).toLocaleDateString();

    return (
        <div>
            <div>
                <h3>{room.block}{room.blockCode}</h3>
            </div>
            <div>
                <div>
                    <p>Рейтинг комнаты:</p>
                    <p>{room.roomRating}</p>
                </div>
                <div>
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