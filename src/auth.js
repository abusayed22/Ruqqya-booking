import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;
        const { identifier, password } = credentials;
        const isEmail = /\S+@\S+\.\S+/.test(identifier);
        user = await prisma.user.findUnique({
          where: isEmail ? { email: identifier } : { phone: identifier },
        });

        const isPasswordValid = await compare(
          password,
          user.password,
        );

        if (!isPasswordValid) return null;
        return user;
      },
    }),
  ],
  pages: "/sign-in",
  // secret: process.env.NEXTAUTH_URL,
  trustHost:true,
  debug:true,
  callbacks: {
    async jwt({ token, user,trigger,session }) {
      if(trigger === "update"){
        return{...token,...session.user}
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role
      }

      return session;
    },
  },
});


