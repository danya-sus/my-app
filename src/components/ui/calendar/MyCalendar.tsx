import React, { FC, useState } from 'react';
import { Calendar } from 'react-calendar';

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
            />
        </>
    )
}

export default MyCalendar;