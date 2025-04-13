import { auth } from '@/auth';
import BookingRequest from '@/components/BookingRequest'
import { notFound } from 'next/navigation';
import React from 'react'

const page = async() => {

  const session = await auth();
  const user = session?.user;
  
    if (user?.role === "user") {
      return notFound();
    } else if (user?.role === "admin") {
      return  <BookingRequest />;
    } else {
      return notFound();
    }


  return (
    <div>
        <BookingRequest />
    </div>
  )
}

export default page