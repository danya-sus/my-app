import axios from "axios";
import { IResidend, IResidentList, PagingParams } from "../contracts/Contracts";
import BaseServise from "./BaseService";

const RESIDENTS_URL = "https://localhost:8081/api/residents";

export default class ResidentsService extends BaseServise {
    static async getAll(params: PagingParams, deleted?: boolean, filter?: {name: string, room: string, campus: string}) {
        try
        {
            const response = await axios.get<IResidentList>(RESIDENTS_URL, {params:{...params, deleted, ...filter}, headers: this.getAuthHeader()});
            return response.data;
        }
        catch (e) 
        {
            console.log(e);
        }
    }

    static async getById(id: string) {
        try 
        {
            const response = await axios.get<IResidend>(`${RESIDENTS_URL}/${id}`, {headers: this.getAuthHeader()});
            return response.data;
        }
        catch (e)
        {
            console.log(e)
        }
    }

    static async getByRoom(roomId: string) {
        try
        {
            const response = await axios.get<IResidend[]>(`${RESIDENTS_URL}/by-room/${roomId}`, {headers: this.getAuthHeader()});
            return response.data;
        }
        catch (e)
        {
            console.log(e)
        }
    }

    static async updateResident(resident: IResidend) {
        try
        {
            const response = await axios.put(`${RESIDENTS_URL}/${resident.id}`, {resident});

            if (response.status === 200) {
                return true;
            }

            return false;
        }
        catch (e)
        {
            console.log(e)
            return false;
        }
    }

    static async deleteResident(id: string) {
        try
        {
            const response = await axios.delete(`${RESIDENTS_URL}/${id}`);
            
            if (response.status === 200) {
                return true;
            }

            return false;
        }
        catch (e)
        {
            console.log(e)
            return false;
        }
    }
}