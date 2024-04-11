import axios from "axios";
import { IThing, IThingList, PagingParams } from "../contracts/Contracts";


const THINGS_URL = "https://localhost:8081/api/things";

export default class ThingsService {
    static async getAll(params: PagingParams) {
        try
        {
            const response = await axios.get<IThingList>(THINGS_URL, {params})
            return response.data;
        }
        catch (e) 
        {
            console.log(e)
        }
    }

    static async addThing(thing: IThing) {
        try
        {
            const response = await axios.post(THINGS_URL, {thing})

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

    static async updateThing(thing: IThing) {
        try
        {
            const response = await axios.put(`${THINGS_URL}/${thing.id}`, {thing})

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

    static async deleteThing(id: string) {
        try
        {
            const response = await axios.delete(`${THINGS_URL}/${id}`);

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