import axios from "axios";
import { IRequestType, PagingParams } from "../contracts/Contracts";
import BaseServise from "./BaseService";


const REQUEST_TYPES_URL = "https://localhost:8081/request-types";

export default class RequestTypesService extends BaseServise {
    static async getAll(params: PagingParams) {
        try
        {
            const response = await axios.get<IRequestType[]>(REQUEST_TYPES_URL, {params, headers: this.getAuthHeader()});
            return response.data;
        }
        catch (e)
        {
            console.log(e)
        }
    }

    static async addRequestType(requestType: IRequestType) {
        try
        {
            const response = await axios.post(REQUEST_TYPES_URL, requestType);

            if (response.status === 200) {
                return true
            }

            return false
        }
        catch (e)
        {
            console.log(e)
            return false
        }
    }

    static async updateRequestType(requestType: IRequestType) {
        try
        {
            const response = await axios.put(`${REQUEST_TYPES_URL}/${requestType.id}`, requestType);

            if (response.status === 200) {
                return true
            }

            return false
        }
        catch (e)
        {
            console.log(e)
            return false
        }
    }

    static async deleteRequestType(id: string) {
        try
        {
            const response = await axios.delete(`${REQUEST_TYPES_URL}/${id}`);

            if (response.status === 200) {
                return true
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