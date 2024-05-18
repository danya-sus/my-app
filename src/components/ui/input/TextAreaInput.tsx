import React, { FC } from 'react'
import classes from './Input.module.css';

type TextAreaInputProps = {
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => any,
    value?: string
}

const TextAreaInput: FC<TextAreaInputProps> = ({...props}) => {
  return (
    <textarea className={classes.textArea} placeholder={props.placeholder} onChange={(e) => props.onChange(e)} defaultValue={props.value}/>
  )
}

export default TextAreaInput;