"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const customerProfileData = async (
  customerId,
  ruqyyaCompletedPage,
  hizamaCompletedPage,
  ruqyyaPendingPage,
  hizamaPendingPage,
  ruqyyaRejectedPage,
  hizamaRejectedPage
) => {
  try {

    const session = await auth();
    const { user } = session;
    if (!user || !user.id) {
      throw new Error("User is not authenticated.");
    }

    const limit = 2;

    const customerRuqyyaCompleted = await prisma.ruqyya.findMany({
      where: {
        userId: parseInt(customerId),
        status: "completed",
      },
      skip: (parseInt(ruqyyaCompletedPage) - 1) * limit,
      take: parseInt(ruqyyaCompletedPage),
    });
    const completedRuqyyaCount = await prisma.ruqyya.count({
      where: {
        userId: parseInt(customerId),
        status: "completed",
      },
    });

    const customerHizamaCompleted = await prisma.hizama.findMany({
      where: {
        userId: parseInt(customerId),
        status: "completed",
      },
      skip: (parseInt(hizamaCompletedPage) - 1) * limit,
      take: parseInt(hizamaCompletedPage),
    });
    const HizamaCompletedCount = await prisma.hizama.count({
      where: {
        userId: parseInt(customerId),
        status: "completed",
      },
    });

    const customerRuqyyaPending = await prisma.ruqyya.findMany({
      where: {
        userId: parseInt(customerId),
        status: "pending",
      },
      skip: (parseInt(ruqyyaPendingPage) - 1) * limit,
      take: parseInt(ruqyyaPendingPage),
    });
    const ruqyyaPendingCount = await prisma.ruqyya.count({
      where: {
        userId: parseInt(customerId),
        status: "pending",
      },
    });

    const customerHizamaPending = await prisma.hizama.findMany({
      where: {
        userId: parseInt(customerId),
        status: "pending",
      },
      skip: (parseInt(hizamaPendingPage) - 1) * limit,
      take: parseInt(hizamaPendingPage),
    });
    const hizamaPedingCount = await prisma.hizama.count({
      where: {
        userId: parseInt(customerId),
        status: "pending",
      },
    });

    const customerRuqyyaRejected = await prisma.ruqyya.findMany({
      where: {
        userId: parseInt(customerId),
        status: "rejected",
      },
      skip: (parseInt(ruqyyaRejectedPage) - 1) * limit,
      take: parseInt(ruqyyaRejectedPage),
    });
    const ruqyyaRejectedCount = await prisma.ruqyya.count({
      where: {
        userId: parseInt(customerId),
        status: "rejected",
      },
    });

    const customerHizamaRejected = await prisma.hizama.findMany({
      where: {
        userId: parseInt(customerId),
        status: "rejected",
      },
      skip: (parseInt(hizamaRejectedPage) - 1) * limit,
      take: parseInt(hizamaRejectedPage),
    });
    const HizamaRejectedCount = await prisma.hizama.findMany({
      where: {
        userId: parseInt(customerId),
        status: "rejected",
      },
    });

    return {
      customerHizamaRejected,
      customerRuqyyaRejected,
      customerHizamaPending,
      customerRuqyyaPending,
      customerHizamaCompleted,
      customerRuqyyaCompleted,
      HizamaRejectedCount,
      ruqyyaRejectedCount,
      hizamaPedingCount,
      ruqyyaPendingCount,
      HizamaCompletedCount,
      completedRuqyyaCount,
    };
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

export const singleDataFethcing = async (customerId, category, page) => {
  try {
    const session = await auth();
    const { user } = session;
    if (!user || !user.id) {
      throw new Error("User is not authenticated.");
    }

    const limit = 5;
    const skip = (parseInt(page) - 1) * limit;

    let data;
    let count;

    switch (category) {
      case "RuqyyaCompleted":
        data = await prisma.ruqyya.findMany({
          where: {
            userId: parseInt(customerId),
            status: "completed",
          },
          skip,
          take: limit,
        });
        const ruqyyaComCount = await prisma.ruqyya.count({
          where: {
            userId: parseInt(customerId),
            status: "completed",
          },
        });
        count = Math.ceil(ruqyyaComCount/limit)
        break;

      case "HizamaCompleted":
        data = await prisma.hizama.findMany({
          where: {
            userId: parseInt(customerId),
            status: "completed",
          },
          skip,
          take: limit,
        });
        const hizamaComCount = await prisma.hizama.count({
            where: {
              userId: parseInt(customerId),
              status: "completed",
            },
          });
          count = Math.ceil(hizamaComCount/limit)
        break;

      case "RuqyyaPending":
        data = await prisma.ruqyya.findMany({
          where: {
            userId: parseInt(customerId),
            status: "pending",
          },
          skip,
          take: limit,
        });
        const ruqyyaPenCount = await prisma.ruqyya.count({
          where: {
            userId: parseInt(customerId),
            status: "pending",
          },
        });
        count = Math.ceil(ruqyyaPenCount/ limit)
        break;

      case "HizamaPending":
        data = await prisma.hizama.findMany({
          where: {
            userId: parseInt(customerId),
            status: "pending",
          },
          skip,
          take: limit,
        });
        const hizamaPendCount = await prisma.hizama.count({
          where: {
            userId: parseInt(customerId),
            status: "pending",
          },
        });
        count = Math.ceil(hizamaPendCount /limit)
        break;

      case "RuqyyaRejected":
        data = await prisma.ruqyya.findMany({
          where: {
            userId: parseInt(customerId),
            status: "rejected",
          },
          skip,
          take: limit,
        });
        const ruqyyaRejectedCount = await prisma.ruqyya.count({
          where: {
            userId: parseInt(customerId),
            status: "rejected",
          },
        });
        count = Math.ceil(ruqyyaRejectedCount /limit)
        break;

      case "HizamaRejected":
        data = await prisma.hizama.findMany({
          where: {
            userId: parseInt(customerId),
            status: "rejected",
          },
          skip,
          take: limit,
        });
        const hizamaRejectedCount = await prisma.hizama.count({
          where: {
            userId: parseInt(customerId),
            status: "rejected",
          },
        });
        count = Math.ceil(hizamaRejectedCount /limit);
        break;

      default:
        throw new Error("Invalid category");
    }

    return {
      data,
      count,
    };
  } catch (error) {
    console.error("Error occurred:", error);
  }
};




export const customerInfo = async (customerId) => {
  try {
    const personalInfo = await prisma.user.findUnique({
      where: {
        id: parseInt(customerId),
      },
    });
    return personalInfo;
  } catch (error) {
    console.log(error);
    throw new Error("Get error customer info");
  }
};

export const customerInfoUpdate = async (customerId,name,address) => {
  try {
    const personalInfo = await prisma.user.update({
      where: {
        id: parseInt(customerId),
      },
      data: {
        name: name,
        address: address
      }
    });
    return personalInfo;
  } catch (error) {
    console.log(error);
    throw new Error("Get error customer info");
  }
};
