import { auth } from "@/auth";
import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";
import { notFound } from "next/navigation";
import React from "react";

const page = async () => {

  const session = await auth();
  const user = session?.user;

  if(user?.role === "user"){
    return <UserDashboard userId={user?.id}/>
  } else if(user?.role === "admin"){
    return <AdminDashboard />
  } else{
    return notFound()
  }
};

export default page;
