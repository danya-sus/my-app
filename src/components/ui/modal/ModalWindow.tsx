import React, { FC } from 'react'
import classes from './Modal.module.css'
import CrossButton from '../buttons/CrossButton'

type ModalWindowProps = {
  children: React.ReactNode,
  visible: boolean,
  setVisible: () => any
}

const ModalWindow: FC<ModalWindowProps> = ({...props}) => {
  const rootClass = [classes.modalWindow];

  if (props.visible) {
    rootClass.push(classes.active)
  }

  return (
    <div className={rootClass.join(' ')} onClick={props.setVisible}>
      <div onClick={(e) => e.stopPropagation()}>
        <CrossButton onClick={props.setVisible}/>
        {props.children}
      </div>
    </div>
  )
}

export default ModalWindow;