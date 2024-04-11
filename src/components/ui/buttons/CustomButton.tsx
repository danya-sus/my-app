import { FC } from 'react';
import classes from './Button.module.css';

type CustomButtonProps = {
    children: string,
    backgroundColor?: string,
    color?: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}

const CustomButton : FC<CustomButtonProps> = ({children, backgroundColor, color, onClick}) => {
  return (
    <button style={{backgroundColor: backgroundColor, color: color}} onClick={(e) => onClick(e)} className={classes.customButton}>
      {children}
    </button>
  )
}

export default CustomButton;