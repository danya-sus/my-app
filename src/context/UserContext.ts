import { createContext } from "react";
import { IUser } from "../contracts/Contracts";

type UserContextType = {
    user?: IUser,
    setUser: (value: IUser) => any
}

export const UserContext = createContext<UserContextType>({user: undefined, setUser: () => {}});