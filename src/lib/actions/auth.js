"use server";

// import { signIn } from "@/auth"
import { compare, hash } from "bcryptjs";
import prisma from "../prisma";
import { signIn } from "@/auth";

export const signInWithCredentials = async ({ identifier, password }) => {

  try {
    const result = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
};

export const signUp = async (params) => {
  const { name, email, phone, address, password } = params;

  const exsitingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exsitingUser?.length > 0) {
    return { success: false, error: "User Already exists" };
  }

  const salt = 10;
  const hashedPassword = await hash(password, salt);

  try {
    const createdUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        phone: phone,
        address: address,
        password: hashedPassword,
      },
    });

    await signInWithCredentials({ email, password });
    return { success: true };
  } catch (error) {
    console.log({ error: error });
    return { success: false, error: "Signup error" };
  }
};

// resetPassword
export const resetPassword = async (email,userId, newPassword) => {

  const salt = 10;
  const hashedPassword = await hash(newPassword, salt);

  try {
    const createdUser = await prisma.user.update({
      where:{
        id:parseInt(userId),
        email:email
      },
      data: {
        password: hashedPassword,
      },
    });

    await signInWithCredentials({ email, password:newPassword });
    return { success: true,message: "Reset password successfully." };
  } catch (error) {
    console.log({ error: error });
    return { success: false, error: "Reset password error" };
  }
};

// verify old password
export const verifiedPassword = async (email, userId, oldPassword) => {
  try {
    const exsitingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

      const isPasswordValid = await compare(oldPassword,exsitingUser.password);
      if(isPasswordValid) {
        return {success:true}
      } 
      return {success:false,massage:"No match with exist password"}
  } catch (error) {
    console.log({ error: error });
    return { success: false, error: "No match with exist password" };
  }
};
