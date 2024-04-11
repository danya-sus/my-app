import React, { FC } from 'react'

type ListHeaderProps = {
    values: string[]
}

const ListHeader: FC<ListHeaderProps> = ({...props}) => {
  return (
    <thead>
        <tr>
            {
                props.values.map((header) => <th key={header}>{header}</th>)
            }
        </tr>
    </thead>
  )
}

export default ListHeader;