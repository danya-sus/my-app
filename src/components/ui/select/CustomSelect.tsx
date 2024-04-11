import { FC } from 'react';
import classes from './Select.module.css';

type CustomSelectProps = {
    children: string[],
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any
}

const CustomSelect: FC<CustomSelectProps> = ({children, ...props}) => {
    return (
        <select defaultValue={props.value} onChange={props.onChange} className={classes.customSelect}>
            {
                children.map((item: string) => <option key={item}>{item}</option>)
            }
        </select>
    )
}

export default CustomSelect;