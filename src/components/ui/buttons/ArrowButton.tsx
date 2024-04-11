import { FC } from 'react';
import classes from './Button.module.css';

type ArrowButtonProps = {
    disabled: boolean,
    name: string,
    direction: string,
    onClick: (name: string) => any
}

const ArrowButton: FC<ArrowButtonProps> = ({...props}) => {
  return (
    <button 
      disabled={props.disabled} 
      onClick={() => props.onClick(props.name)}
      className={classes[`arrowButton__${props.direction}`]} 
    />
  )
}

export default ArrowButton;