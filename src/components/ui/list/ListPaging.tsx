import React, { FC } from 'react'
import CustomSelect from '../select/CustomSelect';
import DoubleArrowButton from '../buttons/DoubleArrowButton';
import ArrowButton from '../buttons/ArrowButton';

type ListPagingProps = {
    total: number,
    totalPages: number,
    currentPage: number,
    pageSize: number,
    takeCount: number,
    skipCount: number,
    setTakeCount: (value: React.ChangeEvent<HTMLSelectElement>) => any,
    setSkipCount: (name: string) => any
}

const ListPaging: FC<ListPagingProps> = (props) => {
  const calculateItems = () => {
    let start = 1 + (props.currentPage - 1) * props.pageSize;
    let end;
    if (props.currentPage * props.pageSize > props.total) {
      end = props.currentPage * props.pageSize - (props.currentPage * props.pageSize - props.total)
    }
    else {
      end = props.currentPage * props.pageSize
    }

    return `${start} - ${end} из ${props.total}`
  }

  return (
    <div style={{display: 'flex', gridGap: '20px'}}>
      <CustomSelect value={props.takeCount.toString()} children={['10', '25', '50', '100']} onChange={(value) => {props.setTakeCount(value)}} />
        <p>Страница {props.currentPage} из {props.totalPages}</p>
        <p>{calculateItems()}</p>
        <div>
          <DoubleArrowButton 
            disabled={props.currentPage === 1} 
            name='prev-last'
            direction='left'
            onClick={props.setSkipCount}
          />
          <ArrowButton 
            disabled={props.currentPage === 1}
            name='prev'
            direction='left'
            onClick={props.setSkipCount}
          />
          <ArrowButton 
            disabled={props.currentPage === props.totalPages}
            name='next'
            direction='right'
            onClick={props.setSkipCount}
          />
          <DoubleArrowButton 
            disabled={props.currentPage === props.totalPages} 
            name='next-last'
            direction='right'
            onClick={props.setSkipCount}
          />
        </div>
    </div>
  )
}

export default ListPaging;