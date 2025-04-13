"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const createTimeSlot = async (formObj) => {
  try {
    // const session = await auth();
    // const { user } = session;
    // console.log(user);
    const { selectedCategory, selectedTime } = formObj;

    if (selectedCategory === "ruqyya") {
      const result = await prisma.timeslot.create({
        data: {
          time: selectedTime,
          category: "ruqyya",
        },
      });
      return {
        success: true,
        message: "Ruqyya time solt create done.",
      };
    } else if (selectedCategory === "hizama") {
      const result = await prisma.timeslot.create({
        data: {
          time: selectedTime,
          category: "hizama",
        },
      });
      return {
        success: true,
        message: "Hizama time slot create done",
      };
    } else {
      throw new Error("Invalid category selected.");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const fetchTimeSlot = async (category) => {
  try {
   
    const timeSlots = await prisma.timeslot.findMany({
      where: {
        category:category

      },
      select:{
        time:true
      }
    })
    return {timeSlots};
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};


export const getAlltimeslot = async (tab) => {
  try {
    const session = await auth();
    const { user } = session;
    const pageSize = 10;

    // Ensure that user exists and is authenticated
    if (!user || user.role !== "admin") {
      throw new Error("User is not Admin.");
    }

    if (tab === "ruqyya") {
      const result = await prisma.timeslot.findMany({
        where: {
          category: "ruqyya",
        },
        
      });

      const totalCount = await prisma.timeslot.count({
        where: {
          category:"ruqyya"
        },
      });
      return {
        data: result,
        totalCount,
      };
    } else if (tab === "hizama") {
      const result = await prisma.timeslot.findMany({
        where: {
          category: "hizama",
        },
        
      });

      const totalCount = await prisma.timeslot.count({
        where: {
          category: "hizama",
        },
      });
      return {
        data: result,
        totalCount,
      };
    } else {
      throw new Error("Invalid ");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
