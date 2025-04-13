"use server";

import prisma from "@/lib/prisma";

export const checkDateTime = async (selectedCategory, selectedDate) => {
  try {
    let ruqyyaRequestSlotTimeArray = [];
    let hizamaRequestSlotTimeArray = [];

    const dateOnlys = new Date(selectedDate).toISOString().split("T")[0];
    const dateOnly = new Date(
      Date.UTC(
        dateOnlys.split("-")[0],
        dateOnlys.split("-")[1] - 1,
        dateOnlys.split("-")[2]
      )
    );

    if (selectedCategory === "ruqyya") {
      const result = await prisma.ruqyya.findMany({
        where: {
          requestdate: dateOnly,
          // status: 'approved'
        },
        select: {
          slottime: true,
        },
      });
      ruqyyaRequestSlotTimeArray = result.map((item) => item.slottime);
      const availableSlot = await prisma.timeslot.findMany({
        where: {
          category: "ruqyya",
          time: {
            notIn: ruqyyaRequestSlotTimeArray,
          },
        },
        select: {
          time: true,
        },
      });
      return availableSlot;
    } else if (selectedCategory === "hizama") {
      const result = await prisma.hizama.findMany({
        where: {
          requestdate: dateOnly,
        },
        select: {
          slottime: true,
        },
      });
      hizamaRequestSlotTimeArray = result.map((item) => item.slottime);
      const availableSlot = await prisma.timeslot.findMany({
        where: {
          category: "hizama",
          time: {
            notIn: hizamaRequestSlotTimeArray,
          },
        },
        select: {
          time: true,
        },
      });
      return availableSlot;
    } else {
      console.error("Error occurred:");
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
