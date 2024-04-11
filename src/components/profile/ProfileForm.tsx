import React, { FC } from 'react'

type ProfileProps = {
  children: JSX.Element
}

const ProfileForm: FC<ProfileProps> = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default ProfileForm;