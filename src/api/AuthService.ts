import axios from "axios";
import { IUser, LoginInfo, RegisterInfo } from "../contracts/Contracts";
import BaseServise from "./BaseService";
import ResidentsService from "./ResidentsService";
import EmployeesService from "./EmployeesService";

const AUTH_ACCOUNT_URL = 'https://localhost:8081/api/account';

export default class AuthService extends BaseServise {

    static async login(userData: LoginInfo) : Promise<any> {
        try
        {
            const response = await axios.post<IUser>(`${AUTH_ACCOUNT_URL}/login`, {...userData})
            
            if (response.status === 200) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('firstName', response.data.firstName);
                localStorage.setItem('lastName', response.data.lastName);
                localStorage.setItem('middleName', response.data.middleName);
                localStorage.setItem('type', response.data.type);
                localStorage.setItem('roles', response.data.roles.join(';'));
                localStorage.setItem('token', response.data.token);

                return response.data;
            }

            return null;
        }
        catch (e) 
        {
            console.log(e)
            return null
        }
    }
    
    static async register(userData: RegisterInfo) : Promise<any> {
        try
        {
            const response = await axios.post(`${AUTH_ACCOUNT_URL}/register`, {
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                middleName: userData.middleName,
                birthDate: userData.birthDate
            })
            if (response.status === 200) {
                return true
            }

            return false
        }
        catch (e)
        {
            console.log(e)
        }
    }
    
    static async account() {
        try
        {
            const response = await axios.get<IUser>(AUTH_ACCOUNT_URL, {headers: this.getAuthHeader()});
            
            return response.data;
        }
        catch (e)
        {
            console.log(e);
        }
    }

    static async getProfileInfo() {
        const account = await this.account();

        if (account) {
            switch (account.type) {
                case 'resident': 
                    return {type: 'resident', data: await ResidentsService.getById(account.id)};
                case 'employee':
                    return {type: 'employee', data: await EmployeesService.getById(account.id)};
            }
        }

        return null;
    }
}