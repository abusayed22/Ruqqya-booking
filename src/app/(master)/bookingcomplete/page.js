import { auth } from '@/auth';
import BookingComplete from '@/components/BookingComplete'
import { notFound } from 'next/navigation';
import React from 'react'

const page = async() => {

  const session = await auth();
  const user = session?.user;
  if (user?.role === "user") {
    return notFound();
  } else if (user?.role === "admin") {
    return <BookingComplete />;
  } else {
    return notFound();
  }
}

export default page