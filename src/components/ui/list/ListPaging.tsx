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
    setTakeCount: (value: string) => any,
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

  function* getTakeValues() {
    yield {id: '10', value: '10'};
    yield {id: '25', value: '25'};
    yield {id: '50', value: '50'};
    yield {id: '100', value: '100'};
  }

  return (
    <div style={{display: 'flex', gridGap: '20px'}}>
      <CustomSelect 
        value={props.takeCount.toString()} 
        children={Array.from(getTakeValues())} 
        onChange={(value) => {props.setTakeCount(value.target.selectedOptions[0].id)}} 
      />
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