"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const userDashboardDataFetching = async (userId) => {
  try {
    const session = await auth();
    const { user } = session;
    if (!user || !user.id) {
        throw new Error("User is not authenticated.");
      }
    
    const ruqyyaRequestCount = await prisma.ruqyya.count({
        where: {
            status: "pending",
            userId: parseInt(userId),
        }
    });        
    const hizamaRequestCount = await prisma.hizama.count({
        where: {
            userId: parseInt(userId),
            status: "pending"
        }
    })   
    const ruqyyaCompletedCount = await prisma.ruqyya.count({
        where: {
            userId: parseInt(userId),
            status: "completed"
        }
    });        
    const hizamaCompletedCount = await prisma.hizama.count({
        where: {
            userId: parseInt(userId),
            status: "completed"
        }
    })   
    const ruqyyaRejectedCount = await prisma.ruqyya.count({
        where: {
            userId: parseInt(userId),
            status: "completed"
        }
    });        
    const hizamaRejectedCount = await prisma.hizama.count({
        where: {
            userId: parseInt(userId),
            status: "completed"
        }
    })   
    
    const totalBookingRequest = (ruqyyaRequestCount + hizamaRequestCount)
    return {bookingReq:totalBookingRequest,ruqqyaReq:ruqyyaRequestCount,hizamaReq:hizamaRequestCount,ruqyyaCom:ruqyyaCompletedCount,hizamaCom:hizamaCompletedCount,ruqyyaRej:ruqyyaRejectedCount,hizamaRej:hizamaRejectedCount}
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
