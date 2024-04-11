import { FC } from 'react';
import classes from './Button.module.css';

type CrossButtonProps = {
    onClick: () => any
}

const CrossButton: FC<CrossButtonProps> = ({...props}) => {
  return (
    <button onClick={props.onClick} className={classes.crossButton} />
  )
}

export default CrossButton;