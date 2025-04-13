import { auth } from '@/auth';
import ProfileLayer from '@/components/ProfileLayer'
import { customerInfo } from '@/lib/user/actions/viewProfile';
import React from 'react'

const page = async() => {
   const session = await auth();
   const user = session?.user;

     
  return (
    <div>
        <ProfileLayer user={user}/>
    </div>
  )
}

export default page