import React, { FC, useEffect, useState } from 'react'
import { IRoom } from '../contracts/Contracts'
import RoomsService from '../api/RoomsService';
import RoomInfo from '../components/rooms/RoomInfo';

type ResidentRoomProps = {}

const ResidentRoom : FC<ResidentRoomProps> = () => {
  const [room, setRoom] = useState<IRoom>();

  const fetchRoom = async () => {
    const response = await RoomsService.getByCurrentUser();

    if (response) {
      setRoom(response);
    }
  }

  useEffect(() => {
    fetchRoom()
  }, [])

  return (
    <>
      {
        room
        ?
        <RoomInfo room={room} />
        :
        <></>
      }
    </>
  )
}

export default ResidentRoom;