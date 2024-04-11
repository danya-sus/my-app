import axios from "axios";
import { ICampus } from "../contracts/Contracts";
import AuthService from "./AuthService";
import ResidentsService from "./ResidentsService";
import BaseServise from "./BaseService";


const CAMPUSES_URL = "https://localhost:8081/api/campuses";

export default class CampusesService extends BaseServise {
    static async getCampus() {
        try
        {
            const user = await AuthService.account();

            if (user && user.type === 'resident') {
                const resident = await ResidentsService.getById(user.id);

                if (resident) {
                    const campus = await this.getById(resident.id);

                    return campus;
                }
            }
        }
        catch (e) 
        {
            console.log(e)
        }
    }

    static async getById(id: string) {
        try
        {
            const response = await axios.get<ICampus>(`${CAMPUSES_URL}/${id}`, {headers: this.getAuthHeader()});

            return response.data;
        }
        catch (e)
        {
            console.log(e);
        }
    }

    static async addCampus(campus: ICampus) {
        try
        {
            const response = await axios.post(CAMPUSES_URL, {campus});

            if (response.status === 200) {
                return true;
            }

            return false;
        }
        catch (e)
        {
            console.log(e);
            return false;
        }
    }

    static async updateCampus(campus: ICampus) {
        try
        {
            const response = await axios.put(`${CAMPUSES_URL}/${campus.id}`, {campus});

            if (response.status === 200) {
                return true;
            }

            return false;
        }
        catch (e)
        {
            console.log(e);
            return false;
        }
    }

    static async deleteCampus(id: string) {
        try
        {
            const response = await axios.delete(`${CAMPUSES_URL}/${id}`);

            if (response.status === 200) {
                return true;
            }

            return false
        }
        catch (e)
        {
            console.log(e);
            return false;
        }
    }
}