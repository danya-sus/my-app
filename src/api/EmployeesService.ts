import axios from "axios";
import { IEmployee, IEmployeeList, IUserParams } from "../contracts/Contracts";
import BaseServise from "./BaseService";


const EMPLOYEES_URL = "https://localhost:8081/api/employees";

export default class EmployeesService extends BaseServise {
    static async getAll(params: IUserParams) {
        try
        {
            const response = await axios.get<IEmployeeList>(EMPLOYEES_URL, {params, headers: this.getAuthHeader()})
            return response.data;
        }
        catch (e)
        {
            console.log(e)
        }
    }

    static async getById(id: string) {
        try
        {
            const response = await axios.get<IEmployee>(`${EMPLOYEES_URL}/${id}`, {headers: this.getAuthHeader()});
            return response.data;
        }
        catch (e)
        {
            console.log(e)
        }
    }

    static async addEmployee(employee: IEmployee) {
        try
        {
            const response = await axios.post(EMPLOYEES_URL, {employee}, {headers: this.getAuthHeader()});

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

    static async updateEmployee(employee: IEmployee) {
        try
        {
            const response = await axios.put(`${EMPLOYEES_URL}/${employee.id}`, {employee}, {headers: this.getAuthHeader()});

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

    static async deleteEmployee(id: string) {
        try
        {
            const response = await axios.delete(`${EMPLOYEES_URL}/${id}`, {headers: this.getAuthHeader()});
            
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