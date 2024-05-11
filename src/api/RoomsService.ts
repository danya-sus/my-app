import axios from "axios";
import { IRoom, IRoomList, PagingParams } from "../contracts/Contracts";
import BaseServise from "./BaseService";


const ROOMS_URL = "https://localhost:8081/api/rooms";

export default class RoomsService extends BaseServise {
    static async getAll(params: PagingParams) {
        try
        {
            const response = await axios.get<IRoomList>(ROOMS_URL, {params, headers: this.getAuthHeader()});
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
            const response = await axios.post(ROOMS_URL, {room}, {headers: this.getAuthHeader()})

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
            const response = await axios.put(`${ROOMS_URL}/${room.id}`, room, {headers: this.getAuthHeader()})

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
            const response = await axios.delete(`${ROOMS_URL}/${id}`, {headers: this.getAuthHeader()})

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