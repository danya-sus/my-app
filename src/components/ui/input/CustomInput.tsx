import React, { FC, useState } from 'react';
import classes from './Input.module.css';

type CustomInputProps = {
    name?: string,
    pattern?: string,
    required?: boolean,
    type?: string,
    errormessage?: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
}

const CustomInput: FC<CustomInputProps> = ({...props}) => {
    const [focused, setFocused] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [value, setValue] = useState('');

    const handleFocus = () => {
        setErrorMessage('');
    }

    const handleFocused = () => {
        setFocused(true);
        if (props.required && props.errormessage) {
            if (value === '') {
                setErrorMessage('Поле не должно быть пустым')
            }
            else {
                setErrorMessage(props.errormessage)
            }
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    
    return (
        <div className={classes.inputContainer}>
            <input 
                className={classes.input} 
                {...props} 
                onFocus={handleFocus}
                onBlur={handleFocused} 
                data-focused={focused.toString()} 
                onChange={(e) => {props.onChange(e); handleOnChange(e)}} 
            />
            {
                props.required
                ?
                <span className={classes.errorMessage}>{errorMessage}</span>
                :
                <></>
            }
        </div>
    )
}

export default CustomInput;