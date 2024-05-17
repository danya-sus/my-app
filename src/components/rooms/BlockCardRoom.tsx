import React, { FC, useEffect, useState } from 'react'
import { IResidend, IRoom } from '../../contracts/Contracts'
import CustomButton from '../ui/buttons/CustomButton'
import ResidentsService from '../../api/ResidentsService'
import LinkButton from '../ui/buttons/LinkButton'
import { Link } from 'react-router-dom'
import CustomSelect from '../ui/select/CustomSelect'
import TextAreaInput from '../ui/input/TextAreaInput'
import MyCalendar from '../ui/calendar/MyCalendar'
import RoomsService from '../../api/RoomsService'
import RedactForm from '../ui/input/RedactForm'

type BlockCardRoomProps = {
    room: IRoom,
    updateRoom: (room: IRoom) => void
}

const BlockCardRoom: FC<BlockCardRoomProps> = ({...props}) => {
    const [room, setRoom] = useState<IRoom>(props.room);

    const [residents, setResidents] = useState<IResidend[]>();
    const [redactMode, setRedactMode] = useState(false);
    const [roomRaiting, setRoomRaiting] = useState(room.roomRating)
    const [remarks, setRemarks] = useState(room.remarks);
    const [repairDate, setRepairDate] = useState(new Date(room.repairDate));

    const fetchResidents = async () => {
        const response = await ResidentsService.getByRoom(props.room.id);

        if (response) {
            setResidents(response)
        }
    }

    const updateRoom = async () => {
        const updatedRoomInfo = {
            id: props.room.id,
            block: props.room.block,
            blockCode: props.room.blockCode,
            remarks: remarks,
            repairDate: repairDate.toLocaleDateString(),
            roomRating: roomRaiting
        };

        const response = 
            await RoomsService.updateRoom(updatedRoomInfo);
        
            if (response) {
                setRoom(updatedRoomInfo);
                setRedactMode(false);
                props.updateRoom(updatedRoomInfo);
            }
    }

    function* getRaitingValues() {
        for (let i = 0; i < 10; i++) {
            yield ({id: (i + 1).toString(), value: (i + 1).toString()})
        }
    }

    const getDate = (dateString: string) => new Date(dateString).toLocaleDateString();

    useEffect(() => {
        setRoom(props.room)
        fetchResidents()
        setRedactMode(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.room])

    return (
        <div>
            <div style={{display: 'flex'}}>
                <p>Рейтинг комнаты: </p>
                <RedactForm redactMode={redactMode} value={room.roomRating}>
                    <CustomSelect 
                        children={Array.from(getRaitingValues())} 
                        value={room.roomRating.toString()} 
                        onChange={(e) => setRoomRaiting(e.target.value)}
                    />
                </RedactForm>
            </div>
            <div style={{display: 'flex'}}>
                <p>Дата ремонта: </p>
                <RedactForm redactMode={redactMode} value={(getDate(room.repairDate))}>
                    <MyCalendar value={repairDate} onClickDay={(date) => setRepairDate(date)} />
                </RedactForm>
            </div>
            <div>
                <p>Замечания: </p>
                <RedactForm redactMode={redactMode} value={room.remarks ? room.remarks : 'Не найдено'}>
                    <TextAreaInput placeholder='' onChange={(e) => setRemarks(e.target.value)} />
                </RedactForm>
            </div>
            <div>
                <p>Проживающие</p>
                {
                    residents
                    ?
                    <>
                        {
                            residents.map(e => 
                                <Link to={`/residents/${e.id}`} key={e.id}>
                                    <LinkButton>{`${e.lastName} ${e.firstName} ${e.middleName}`}</LinkButton>
                                </Link>
                            )
                        }
                    </>
                    :
                    <p>Не найдено</p>
                }
            </div>
            {
                redactMode
                ?
                <>
                    <CustomButton onClick={() => updateRoom()}>Сохранить</CustomButton>
                    <CustomButton onClick={() => setRedactMode(false)}>Отменить</CustomButton>
                </>
                :
                <CustomButton onClick={() => setRedactMode(true)}>Редактировать</CustomButton>
            }
        </div>
    )
}

export default BlockCardRoom;