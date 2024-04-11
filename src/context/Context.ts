import { createContext } from "react";
import { IUser } from "../contracts/Contracts";

type AuthContextType = {
    isAuth: boolean,
    setIsAuth: (value: boolean) => any,
    user?: IUser,
    setUser: (value: IUser) => any
}

export const AuthContext = createContext<AuthContextType>({isAuth: false, setIsAuth: () => {}, setUser: () => {}});