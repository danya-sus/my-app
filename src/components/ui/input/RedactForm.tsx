import React, { FC } from 'react'

type RedactFormProps = {
    redactMode: boolean,
    value?: string,
    children: React.ReactNode
}

const RedactForm: FC<RedactFormProps> = ({...props}) => {
  return (
    <>
        {
            props.redactMode
            ?
            <>
                {props.children}
            </>
            :
            <p>{props.value}</p>
        }
    </>
  )
}

export default RedactForm;