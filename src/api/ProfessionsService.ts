import axios from "axios";
import { IProfession, PagingParams } from "../contracts/Contracts";


const PROFESSIONS_URL = "https://localhost:8081/api/professions";

export default class ProfessionsService {
    static async getAll(params: PagingParams) {
        try
        {
            const response = await axios.get<IProfession[]>(PROFESSIONS_URL, {params});
            return response.data;
        }
        catch (e)
        {
            console.log(e);
        }
    }

    static async addProfession(profession: IProfession) {
        try
        {
            const response = await axios.post(PROFESSIONS_URL, {profession});

            if (response.status === 200) {
                return true
            }

            return false
        }
        catch (e)
        {
            console.log(e)
            return false;
        }
    }

    static async updateProfession(profession: IProfession) {
        try
        {
            const response = await axios.put(`${PROFESSIONS_URL}/${profession.id}`, {profession});

            if (response.status === 200) {
                return true
            }

            return false
        }
        catch (e)
        {
            console.log(e)
            return false;
        }
    }

    static async deleteProfession(id: string) {
        try
        {
            const response = await axios.delete(`${PROFESSIONS_URL}/${id}`);

            if (response.status === 200) {
                return true
            }

            return false
        }
        catch (e)
        {
            console.log(e)
            return false;
        }
    }
}