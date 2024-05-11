import { FC } from 'react';
import classes from './Select.module.css';

type CustomSelectProps = {
    children: {id: string, value: string}[],
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any
}

const CustomSelect: FC<CustomSelectProps> = ({children, ...props}) => {
    return (
        <select defaultValue={props.value} onChange={props.onChange} className={classes.customSelect}>
            {
                children.map((e) => <option key={e.id} id={e.id}>{e.value}</option>)
            }
        </select>
    )
}

export default CustomSelect;