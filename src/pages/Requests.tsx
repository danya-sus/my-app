import React, { FC, useContext, useEffect, useState } from 'react'
import { IRequest, IRequestList } from '../contracts/Contracts'
import RequestsService from '../api/RequestService'
import RequestList from '../components/requests/RequestList'
import { AuthContext } from '../context/Context'

const Requests: FC = () => {
  const {user} = useContext(AuthContext);
  const residentRequests = user!.roles.filter(e => e === "Resident").length === 0 ? false : true;
  const [requests, setRequests] = useState<IRequest[]>()
  const [pagingInfo, setPagingInfo] = useState({
    total: 0,
    totalPages: 0,
    pageSize: 0,
    currentPage: 0
  });

  const fetchRequests = async (skip: number = 1, take: number = 10, room?: string) => {
    let response: IRequestList | undefined;
    if (residentRequests) {
      response = await RequestsService.getAllByCurrentResident({PageNumber: 1, PageSize: 10})
    } 
    else {
      response = await RequestsService.getAll({PageNumber: 1, PageSize: 10}, room);
    }
    if (response) {
      setRequests(response.data.value)
      setPagingInfo({
          total: response.total,
          totalPages: response.totalPages,
          pageSize: response.pageSize,
          currentPage: response.currentPage
      })
  }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      {
        requests
        ? <RequestList residentRequests={residentRequests} requests={requests} pagingParams={pagingInfo} fetchRequests={fetchRequests}/>
        : <></>
      }
    </div>
  )
}

export default Requests;