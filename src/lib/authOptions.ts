import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "~/server/db";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async signIn(params) {
      if (
        !params.user.email ||
        !params.user.name ||
        !params.account?.provider
      ) {
        return false;
      }
      const user = await db.user.findUnique({
        where: {
          email: params.user.email,
        },
      });

      if (user) {
        return true;
      }

      await db.user.create({
        data: {
          email: params.user.email,
          name: params.user.name,
          provider: params.account?.provider,
        },
      });
      return true;
    },
  },
} satisfies NextAuthOptions
