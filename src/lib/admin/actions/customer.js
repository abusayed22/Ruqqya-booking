"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getAllUsers = async (page) => {
  try {
    const session = await auth();
    const { user } = session;
    if (!user || !user.id) {
      throw new Error("User is not authenticated.");
    }
    

    const customers = await prisma.user.findMany({
      where: {
        role: "user",
      },
    });
    return { success: true, data: customers };

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};




export const getAllUserPagination = async (page) => {
  try {
    const session = await auth();
    const { user } = session;
    if (!user || !user.id) {
      throw new Error("User is not authenticated.");
    }

    const limit = 10;
    const skip = parseInt(page -1) * limit;

    const customers = await prisma.user.findMany({
      where: {
        role: "user",
      },
      skip,
      take:limit,
    });
    const totalUsers = await prisma.user.count({
      where:{
        role: "user"
      }
    })
    return { success: true, data: customers,totalCount:(totalUsers/limit)};

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

