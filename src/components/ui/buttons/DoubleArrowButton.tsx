import { FC } from 'react';
import classes from './Button.module.css';

type DoubleArrowButtonProps = {
    disabled: boolean,
    name: string,
    direction: string,
    onClick: (name: string) => any
}

const DoubleArrowButton: FC<DoubleArrowButtonProps> = ({...props}) => {
  return (
    <button 
      disabled={props.disabled} 
      onClick={() => props.onClick(props.name)}
      className={classes[`doubleArrowButton__${props.direction}`]} 
    />
  )
}

export default DoubleArrowButton;