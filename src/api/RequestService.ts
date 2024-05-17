import axios from "axios";
import { IAddRequest, IRequestList, PagingParams } from "../contracts/Contracts";
import BaseServise from "./BaseService";

const REQUESTS_URL = "https://localhost:8081/api/requests";

export default class RequestsService extends BaseServise {
    static async getAll(params: PagingParams, room?: string) {
        try
        {
            const response = await axios.get<IRequestList>(REQUESTS_URL, {params: {params, room}, headers: this.getAuthHeader()});
            return response.data
        }
        catch (e)
        {
            console.log(e)
        }
    }

    static async getAllByCurrentResident(params: PagingParams) {
        try
        {
            const response = await axios.get<IRequestList>(`${REQUESTS_URL}/by-current-resident`, {params, headers: this.getAuthHeader()});
            return response.data
        }
        catch (e)
        {
            console.log(e)
        }
    }

    static async addRequest(request: IAddRequest) {
        try
        {
            const response = await axios.post(REQUESTS_URL, request, {headers: this.getAuthHeader()});

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

    static async updateRequest(request: IAddRequest) {
        try
        {
            const response = await axios.put(`${REQUESTS_URL}/${request.id}`, request, {headers: this.getAuthHeader()})

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

    static async updateRequestStatus(requestId: string, statusId: number) {
        try
        {
            const response = await axios.put(`${REQUESTS_URL}/${requestId}/status/${statusId}`, undefined, {headers: this.getAuthHeader()});

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

    static async deleteRequest(requestId: string) {
        try
        {
            const response = await axios.delete(`${REQUESTS_URL}/${requestId}`, {headers: this.getAuthHeader()});

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

/**
 * RequestTypes:
8d9ec580-6d7d-4b3f-8d6e-415d1143b83b
66cf9914-0773-451c-9703-4e8f2ba30092
004b9a68-bd88-4bc4-b8e8-6c617f864033

Employee:
da2feb1a-68aa-479f-b5a5-2d888a278e30 1984-01-20 f040d16c-49cb-470c-a2bf-2644bea5ddb2 (UserId)

Profession:
8f472574-1c3b-4d47-92bc-5135dc2aceae

Residents:
2324c54d-0f38-4a7c-aa7a-80da5285c633
8b1fbeb8-17dd-4502-9c24-454bdd058810
963bb854-d081-4209-8a5d-bdd5f0391854
76b60cd0-f17d-4527-aef5-9ba14de70846



959ae57b-c253-4017-881b-07e3390d6e16
28d5ec33-eeae-4f06-8454-6a73d776b897
4b8739cc-0a9f-4466-a1b8-776cefcbd2f0
e495a353-8a7b-49f1-ae9b-16dce83dad98
c6f0f4d6-9415-46e1-85ce-7612e82158f7
37343a34-6bdf-4566-839d-1c91be8648e8
672e10b8-105b-43b4-8841-f9262031bc9d
a6fc75ac-8f5c-4404-80f0-975eb09f67a1
5b061825-c342-4954-8379-1a6f85414f20
e240de0d-ced6-4c15-b9bb-d770ec2d2423
4d29e24f-4472-40e7-997c-a422b249d4dd
 */