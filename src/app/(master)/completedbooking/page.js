import { auth } from "@/auth";
import AdminCompleted from "@/components/AdminCompleted";
import UserCompleted from "@/components/UserCompleted";
import { notFound } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  const user = session?.user;

  if (user?.role === "user") {
    return <UserCompleted userId={user?.id} />;
  } else if (user?.role === "admin") {
    return <AdminCompleted />;
  } else {
    return notFound();
  }
};

export default page;
