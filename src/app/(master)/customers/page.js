"use server";

import { auth } from '@/auth';
import CustomerList from '@/components/CustomerList'
import { notFound } from 'next/navigation';
import React from 'react'

const page = async() => {

  const session = await auth();
  const user = session?.user;

  
    if (user.role === "user") {
      return notFound();
    } else if (user.role === "admin") {
      return  <CustomerList />;
    } else {
      return notFound();
    }
}

export default page