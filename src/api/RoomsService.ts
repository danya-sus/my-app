import axios from "axios";
import { IRoom, PagingParams } from "../contracts/Contracts";


const ROOMS_URL = "https://localhost:8081/api/rooms";

export default class RoomsService {
    static async getAll(params: PagingParams) {
        try
        {
            const response = await axios.get(ROOMS_URL, {params});
            return response.data;
        }
        catch (e)
        {
            console.log(e)
        }
    }

    static async addRoom(room: IRoom) {
        try
        {
            const response = await axios.post(ROOMS_URL, {room})

            if (response.status === 200) {
                return true;
            }

            return false
        }
        catch (e)
        {
            console.log(e)
            return false
        }
    }

    static async updateRoom(room: IRoom) {
        try
        {
            const response = await axios.put(`${ROOMS_URL}/${room.id}`, {room})

            if (response.status === 200) {
                return true;
            }

            return false
        }
        catch (e)
        {
            console.log(e)
            return false
        }
    }

    static async deleteRoom(id: string) {
        try
        {
            const response = await axios.delete(`${ROOMS_URL}/${id}`)

            if (response.status === 200) {
                return true;
            }

            return false
        }
        catch (e)
        {
            console.log(e)
            return false
        }
    }
}