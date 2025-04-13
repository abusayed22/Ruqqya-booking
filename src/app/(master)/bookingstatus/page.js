import { auth } from "@/auth";
import BookingStatus from "@/components/BookingStatus";
import { notFound } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  const user = session?.user;

  if (user?.role === "user") {
    return <BookingStatus user={user} />;
  } else if (user?.role === "admin") {
    return  notFound();
  } else {
    return notFound();
  }
};

export default page;
