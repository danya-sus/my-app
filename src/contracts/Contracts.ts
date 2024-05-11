
export interface LoginInfo {
    email: string,
    password: string
};

export interface RegisterInfo {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    middleName?: string,
    birthDate: string,
};

export interface LoginResult {
    isSuccess: boolean
}

export interface PagingParams {
    PageNumber: number,
    PageSize: number
}

export interface IUserParams extends PagingParams {
    FullName?: string,
}

export interface IAddress {
    country: string,
    town: string,
    street: string,
    house: number,
    corps: number
}

export interface IPassport {
    passportSeries: string,
    passportNumber: string,
    gender: string,
    registeredPlace: {
        country: string,
        town: string,
        street: string,
        house: number,
        corps: number
    },
    issuedBy: string,
    issuedCode: string,
    issuedDate: string,
    birthDate: string,
    birthPlace: {
        country: string,
        town: string,
        street: string,
        house: number,
        corps: number
    }
}

export interface IResidend {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    phoneNumber: string,
    photoId: string,
    birthDate: string,
    mothersFullName?: string,
    mothersPhoneNumber?: string,
    fathersFullName?: string,
    fathersPhoneNumber?: string,
    isLeftCampus: boolean,
    room: {
        id: string,
        block: string,
        blockCode: string
    },
    campus: {
        id: string,
        name: string
    },
    passport: IPassport
}

export interface IResidentList {
    total: number,
    totalPages: number,
    pageSize: number,
    currentPage: number,
    data: {
        isSuccess: boolean,
        value: IResidend[]
    }
}

export interface IThingList {
    total: number,
    totalPages: number,
    pageSize: number,
    currentPage: number,
    data: {
        isSuccess: boolean,
        value: IResidend[]
    }
}

export interface IThing {
    id: string,
    name: string
}

export interface ICampus {
    id: string,
    name: string,
    htmlInfo: string,
    address: IAddress,
}

export interface IProfession {
    id: string,
    name: string
}

export interface IEmployeeList {
    total: number,
    totalPages: number,
    pageSize: number,
    currentPage: number,
    data: {
        isSuccess: boolean,
        value: IEmployee[]
    }
}

export interface IEmployee {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    phoneNumber: string,
    photoId: string,
    birthDate: string,
    mothersFullName?: string,
    mothersPhoneNumber?: string,
    fathersFullName?: string,
    fathersPhoneNumber?: string,
    isLeftCampus: boolean,
    employmentDate: string,
    passport: IPassport,
    campuses: ICampus[],
    professions: IProfession[]
}

export interface IRequestList {
    total: number,
    totalPages: number,
    pageSize: number,
    currentPage: number,
    data: {
        isSuccess: boolean,
        value: IRequest[]
    }
}

export interface IRequest {
    id: string,
    title: string,
    description?: string,
    createdDate: string,
    closedDate?: string,
    creatorResidentId: string,
    executorEmployeeId: string,
    typeId: string,
    requestStatus: RequestStatus,
    employee?: {
        id: string,
        profession?: string,
        firstName: string,
        lastName: string,
        middleName: string,
        photoId?: string,
        email: string,
        phoneNumber: string
    },
    resident: {
        id: string,
        firstName: string,
        lastName: string,
        middleName: string,
        photoId?: string,
        email: string,
        phoneNumber: string
    },
    requestType: IRequestType
}

export interface IAddRequest {
    id: string,
    title: string,
    description: string,
    typeId: string
}

export interface IRequestType {
    id: string,
    name: string,
    description: string
}

export interface IRoomList {
    total: number,
    totalPages: number,
    pageSize: number,
    currentPage: number,
    data: {
        isSuccess: boolean,
        value: IRoom[]
    }
}

export interface IRoom {
    id: string,
    block: number,
    blockCode: string,
    remarks: string,
    repairDate: string,
    roomRating: string
}

enum RequestStatus {
    Created,
    Pending,
    OnRevision,
    Cancelled,
    InProgress,
    Completed
}

export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,
    token: string,
    type: string,
    roles: string[]
}

export interface IRole {
    id: string,
    name: string
}