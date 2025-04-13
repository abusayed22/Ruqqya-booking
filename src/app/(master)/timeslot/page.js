import { auth } from '@/auth';
import TimeSlots from '@/components/TimeSlots';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async() => {
    const session = await auth();
    const user = session?.user;
    if (user?.role === "admin") {
      return <TimeSlots />;
    } else if (user?.role === "user") {
      return notFound();
    } else {
      return notFound();
    }
}

export default page