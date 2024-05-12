import React, { FC, useEffect, useState } from 'react'
import { IRequest } from '../contracts/Contracts'
import RequestsService from '../api/RequestService'
import RequestList from '../components/requests/RequestList'

const Requests: FC = () => {
  const [requests, setRequests] = useState<IRequest[]>()
  const [pagingInfo, setPagingInfo] = useState({
    total: 0,
    totalPages: 0,
    pageSize: 0,
    currentPage: 0
  });

  const fetchRequests = async () => {
    const response = await RequestsService.getAllByCurrentResident({PageNumber: 1, PageSize: 10});

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
    <>
      {
        requests
        ? <RequestList requests={requests} pagingParams={pagingInfo} fetchRequests={fetchRequests}/>
        : <></>
      }
    </>
  )
}

export default Requests;