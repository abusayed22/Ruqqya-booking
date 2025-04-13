"use server";

import prisma from "../prisma";
import { auth } from "@/auth";

export const UserSheduleStatus = async (tab, page) => {
  try {
    const session = await auth();
    const { user } = session;
    const pageSize = 10;

    // Ensure that user exists and is authenticated
    if (!user || !user.id) {
      throw new Error("User is not authenticated.");
    }

    if (tab === "ruqyya") {
      const result = await prisma.ruqyya.findMany({
        where: {
          userId: parseInt(user.id),
          status: {
            not: "completed",
          },
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
          userId: parseInt(user.id),
          status: {
            not: "completed",
          },
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
          userId: parseInt(user.id),
          status: {
            not: "completed",
          },
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
          userId: parseInt(user.id),
          status: {
            not: "completed",
          },
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

export const UserCompletedStatus = async (tab, page) => {
  try {
    const session = await auth();
    const { user } = session;
    const pageSize = 10;

    // Ensure that user exists and is authenticated
    if (!user || !user.id) {
      throw new Error("User is not authenticated.");
    }

    if (tab === "ruqyya") {
      const result = await prisma.ruqyya.findMany({
        where: {
          userId: parseInt(user.id),
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
          userId: parseInt(user.id),
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
          userId: parseInt(user.id),
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
          userId: parseInt(user.id),
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
