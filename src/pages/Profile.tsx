import React, { FC, useEffect, useState } from 'react'
import AuthService from '../api/AuthService';
import { IEmployee, IResidend } from '../contracts/Contracts';
import ProfileForm from '../components/profile/ProfileForm';
import ResidentCard from '../components/residents/ResidentCard';
import EmployeeCard from '../components/employees/EmployeeCard';

const Profile: FC = () => {
  const [profile, setProfile] = useState<JSX.Element>();

  const fetchProfile = async () => {
    const response = await AuthService.getProfileInfo();

    if (response && response.data) {
      if (response.type === 'resident') {
        setProfile(<ResidentCard resident={response.data as IResidend} />)
      }
      else if (response.type === 'employee') {
        setProfile(<EmployeeCard employee={response.data as IEmployee} />)
      }
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])
  
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {
        profile
        ?
        <ProfileForm>
          {profile}
        </ProfileForm>
        : 
        <></>
      }
    </div>
  )
}

export default Profile;