import axios from "axios";
import BaseServise from "./BaseService";
import { IRole } from "../contracts/Contracts";

const ROLES_URL = "https://localhost:8081/api/roles";

export default class RolesService extends BaseServise {
    static async getAll() {
        try
        {
            const response = await axios.get<IRole[]>(ROLES_URL, {headers: this.getAuthHeader()});
            return response.data;
        }
        catch (e) 
        {
            console.log(e)
        }
    }

    static async addEmployeeRole(roleId: string, employeeId: string) {
        try
        {
            const response = await axios.post(`${ROLES_URL}/${roleId}/employee/${employeeId}`, {headers: this.getAuthHeader()});

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

    static async deleteEmployeeRole(roleId: string, employeeId: string) {
        try
        {
            const response = await axios.delete(`${ROLES_URL}/${roleId}/employee/${employeeId}`, {headers: this.getAuthHeader()});

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

    static async addResidentRole(roleId: string, residentId: string) {
        try
        {
            const response = await axios.post(`${ROLES_URL}/${roleId}/resident/${residentId}`, {headers: this.getAuthHeader()});

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

    static async deleteResidentRole(roleId: string, residentId: string) {
        try
        {
            const response = await axios.delete(`${ROLES_URL}/${roleId}/resident/${residentId}`, {headers: this.getAuthHeader()});

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