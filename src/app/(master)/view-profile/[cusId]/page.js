import { auth } from "@/auth";
import ViewCustomer from "@/components/ViewCustomer";
import { customerInfo, customerProfileData } from "@/lib/user/actions/viewProfile";
import React from "react";

const page = async ({ params }) => {
  const {cusId} = await params;
  const customerId = cusId;

  const session = await auth();
  const user = session?.user;

  const customerdata = await customerInfo(customerId)

  
  return (
    <div>
      <ViewCustomer customerId={customerId} personalInfo={customerdata} user={user}/>
    </div>
  );
};

export default page;
