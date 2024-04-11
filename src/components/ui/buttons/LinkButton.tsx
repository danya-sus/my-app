import classes from './Button.module.css';

type Props = {
    children: string,
    props?: any[]
}

export default function LinkButton({children, ...props}: Props) {
  return (
    <button className={classes.linkButton} {...props}>{children}</button>
  )
}