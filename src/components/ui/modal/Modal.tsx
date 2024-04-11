import React, { FC } from 'react'

type ModalProps = {
    children: React.ReactNode,
    title: string
}

const Modal: FC<ModalProps> = ({children, title}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default Modal;