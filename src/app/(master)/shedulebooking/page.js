import { auth } from "@/auth";
import SheduleBooking from "@/components/SheduleBooking";
import { notFound } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  const user = session?.user;
  if (user?.role === "user") {
    return <SheduleBooking user={session?.user} />;
  } else if (user?.role === "admin") {
    return notFound();
  } else {
    return notFound();
  }
};

export default page;
