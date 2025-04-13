"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dashboardDataFetching = async () => {
  try {
    const session = await auth();
    const { user } = session;
    if (!user || !user.id) {
        throw new Error("User is not authenticated.");
      }
    
    const ruqyyaRequestCount = await prisma.ruqyya.count({
        where: {
            status: "pending"
        }
    });        
    const hizamaRequestCount = await prisma.hizama.count({
        where: {
            status: "pending"
        }
    })   
    const ruqyyaCompletedCount = await prisma.ruqyya.count({
        where: {
            status: "completed"
        }
    });        
    const hizamaCompletedCount = await prisma.hizama.count({
        where: {
            status: "completed"
        }
    })   
    
    const totalBookingRequest = (ruqyyaRequestCount + hizamaRequestCount)
    return {bookingReq:totalBookingRequest,ruqqyaReq:ruqyyaRequestCount,hizamaReq:hizamaRequestCount,ruqyyaCom:ruqyyaCompletedCount,hizamaCom:hizamaCompletedCount}
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
