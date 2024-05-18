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
            <>
              {
                props.value
                ?
                props.value
                :
                'не задано'
              }
            </>
        }
    </>
  )
}

export default RedactForm;