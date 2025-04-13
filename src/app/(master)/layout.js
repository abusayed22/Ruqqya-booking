import { auth } from '@/auth';
import MasterLayout from '@/layout/masterLayout/MasterLayout'
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async({children}) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <MasterLayout session={session}>{children}</MasterLayout>
  )
}

export default layout