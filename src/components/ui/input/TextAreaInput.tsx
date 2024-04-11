import React, { FC } from 'react'

type TextAreaInputProps = {
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => any
}

const TextAreaInput: FC<TextAreaInputProps> = ({...props}) => {
  return (
    <textarea placeholder={props.placeholder} onChange={(e) => props.onChange(e)}/>
  )
}

export default TextAreaInput;