"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const approvedBooking = async (tab, page) => {
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
          status: "approved",
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
          status: "approved",
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
          status: "approved",
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
          status: "approved",
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

export const BookingRequestApproved = async (tab, reqId) => {
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
        data: {
          status: "approved",
        },
      });

      return {
        success: true,
        message: "The Ruqyya Request Approved.",
      };
    } else if (tab === "hizama") {
      const result = await prisma.hizama.update({
        where: {
          id: parseInt(reqId),
        },
        data: {
          status: "approved",
        },
      });

      return {
        success: true,
        message: "The Hizama Request Approved. ",
      };
    } else {
      throw new Error("Invalid ");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const BookingRequestReject = async (tab, reqId) => {
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
        data: {
          status: "rejected",
        },
      });

      return {
        success: true,
        message: "The Ruqyya Request Rejected",
      };
    } else if (tab === "hizama") {
      const result = await prisma.hizama.update({
        where: {
          id: parseInt(reqId),
        },
        data: {
          status: "rejected",
        },
      });

      return {
        success: true,
        message: "The Hizama Request Rejected",
      };
    } else {
      throw new Error("Invalid ");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const BookingCompleted = async (tab, bookingid,amount,userId) => {
  try {
    const session = await auth();
    const { user } = session;
    // const pageSize = 10;

    // Ensure that user exists and is authenticated
    if (!user || !user.id) {
      throw new Error("User is not authenticated!");
    }

    if (tab === "ruqyya") {
      const ruqyyaUpdate = await prisma.ruqyya.update({
        where: {
          id: parseInt(bookingid),
        },
        data: {
          status: "completed",
        },
      });

      const collectionUpdate = await prisma.collection.create({
        data: {
          amount: parseFloat(amount),
          userId: parseInt(userId),
          type: "ruqyya"
        }
      })

      return {
        success: true,
        message: "The Ruqyya Completed",
      };
    } else if (tab === "hizama") {
      const ruqyyaUpdate = await prisma.hizama.update({
        where: {
          id: parseInt(bookingid),
        },
        data: {
          status: "completed",
        },
      });

      const collectionUpdate = await prisma.collection.create({
        data: {
          amount: parseFloat(amount),
          userId: parseInt(userId),
          type: "hizama"
        }
      })

      return {
        success: true,
        message: "The Hizama Completed",
      };
    } else {
      throw new Error("Invalid ");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};



export const AdminCompletedStatus = async (tab, page) => {
  try {
    const session = await auth();
    const { user } = session;
    const pageSize = 10;

    // Ensure that user exists and is authenticated
    if (!user || user.role !== "admin") {
      throw new Error("User is not Admin.");
    }

    if (tab === "ruqyya") {
      const result = await prisma.ruqyya.findMany({
        where: {
          status: "completed",
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
          status:"completed"
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
          status: "completed",
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
          status:  "completed",
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

