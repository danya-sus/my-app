import React, { FC } from 'react'

type TextAreaInputProps = {
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => any,
    value?: string
}

const TextAreaInput: FC<TextAreaInputProps> = ({...props}) => {
  return (
    <textarea placeholder={props.placeholder} onChange={(e) => props.onChange(e)}>{props.value}</textarea>
  )
}

export default TextAreaInput;