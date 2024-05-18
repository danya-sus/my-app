import React, { FC, useState } from 'react';
import { Calendar } from 'react-calendar';
import './MyCalendar.css';

type CalendarProps = {
    locale?: string,
    maxDate?: Date,
    onClickDay?: (date: Date) => void,
    value?: Date
}

const MyCalendar: FC<CalendarProps> = ({...props}) => {
    return (
        <>
            <Calendar 
                locale={props.locale} 
                value={props.value} 
                maxDate={new Date()}
                onClickDay={props.onClickDay}
                className="Calendar"
            />
        </>
    )
}

export default MyCalendar;