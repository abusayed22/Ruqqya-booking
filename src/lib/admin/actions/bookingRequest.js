"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const BookingRequestFetch = async (tab, page) => {
  try {
    const session = await auth();
    const { user } = session;
    const pageSize = 10;

    // Ensure that user exists and is authenticated
    if (!user || !user.id) {
      throw new Error("User is not authenticated!");
    }

    if (tab === "ruqyya") {
      const result = await prisma.ruqyya.findMany({
        where: {
          status: "pending",
        },
        skip: (parseInt(page) - 1) * pageSize,
        take: pageSize,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              address: true,
              phone: true,
              email: true,
            },
          },
        },
      });

      const totalCount = await prisma.ruqyya.count({
        where: {
          status: "pending",
        },
      });
      const totalPages = Math.ceil(totalCount / pageSize);
      return {
        data: result,
        totalCount,
        totalPages,
      };
    } else if (tab === "hizama") {
      const result = await prisma.hizama.findMany({
        where: {
          status: "pending",
        },
        skip: (parseInt(page) - 1) * pageSize,
        take: pageSize,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              address: true,
              phone: true,
              email: true,
            },
          },
        },
      });

      const totalCount = await prisma.hizama.count({
        where: {
          status: "pending",
        },
      });
      const totalPages = Math.ceil(totalCount / pageSize);
      return {
        data: result,
        totalCount,
        totalPages,
      };
    } else {
      throw new Error("Invalid ");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};



export const BookingRequestApproved = async (tab,reqId) => {
    try {
      const session = await auth();
      const { user } = session;
      const pageSize = 10;
  
      // Ensure that user exists and is authenticated
      if (!user || !user.id) {
        throw new Error("User is not authenticated!");
      }
  
      if (tab === "ruqyya") {
        const result = await prisma.ruqyya.update({
          where: {
            id: parseInt(reqId),
          },
          data:{
            status: "approved"
          }
        });
        
        return {
            success:true,
            message: "The Ruqyya Request Approved."
        };
      } else if (tab === "hizama") {
        const result = await prisma.hizama.update({
            where: {
              id: parseInt(reqId),
            },
            data:{
              status: "approved"
            }
          });
        
          return {
              success:true,
              message: "The Hizama Request Approved. "
          };
      } else {
        throw new Error("Invalid ");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };


  export const BookingRequestReject = async (tab,reqId) => {
    try {
      const session = await auth();
      const { user } = session;
      const pageSize = 10;
  
      // Ensure that user exists and is authenticated
      if (!user || !user.id) {
        throw new Error("User is not authenticated!");
      }
  
      if (tab === "ruqyya") {
        const result = await prisma.ruqyya.update({
          where: {
            id: parseInt(reqId),
          },
          data:{
            status: "rejected"
          }
        });
        
        return {
            success:true,
            message: "The Ruqyya Request Rejected"
        };
      } else if (tab === "hizama") {
        const result = await prisma.hizama.update({
            where: {
              id: parseInt(reqId),
            },
            data:{
              status: "rejected"
            }
          });
        
          return {
              success:true,
              message: "The Hizama Request Rejected"
          };
      } else {
        throw new Error("Invalid ");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
