"use server";

import { auth } from "@/auth";
import prisma from "../prisma";

export const createBooking = async (formObj) => {
  try {
    const session = await auth();
    const { user } = session;
   
    const {
      selectedCategory,
      selectedDate,
      name,
      phone,
      address,
      time,
      problem,
    } = formObj;

    const originalDate = new Date(selectedDate);
    
    const formattedDate = `${originalDate.toISOString().slice(0, 10)}T00:00:00.000Z`;
  

    // Ensure that user exists and is authenticated
    if (!user || !user.id) {
      throw new Error("User is not authenticated.");
    }

    if (selectedCategory === "ruqyya") {
      const result = await prisma.ruqyya.create({
        data: {
          requestdate: formattedDate,
          slottime: time,
          problem: problem,
          userId: parseInt(user.id),
          status: "pending",
        },
      });
      return {
        success: true,
        message: "Ruqyya shedule create done. Wait to approval",
      };
    } else if (selectedCategory === "hizama") {
      const result = await prisma.hizama.create({
        data: {
          requestdate: selectedDate,
          slottime: time,
          problem: problem,
          userId: parseInt(user.id),
        },
      });
      return {
        success: true,
        message: "Hizama shedule create done. Wait to Approved",
      };
    } else {
      throw new Error("Invalid ");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
