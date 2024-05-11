import React from 'react'
import ListHeader from './ListHeader'
import ListPaging from './ListPaging'

interface ListProps<T> {
    headers?: string[],
    paging?: {
      total: number,
      totalPages: number,
      currentPage: number,
      pageSize: number,
      takeCount: number,
      skipCount: number,
      setTakeCount: (value: string) => any,
      setSkipCount: (name: string) => any
    },
    items: T[],
    renderItem: (item: T) => React.ReactNode,
}

export default function List<T>(props: ListProps<T>) {
  return (
    <div>
      <table>
        {
          props.headers
          ? <ListHeader values={props.headers} />
          : <></>
        }
        <tbody>
          {
            props.items.map(props.renderItem)
          }
        </tbody>
      </table>
      {
        props.paging
        ? <ListPaging {...props.paging} />
        : <></>
      }
    </div>
  )
}