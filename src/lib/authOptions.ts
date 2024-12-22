import { NextAuthOptions, User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import { SignInSchema } from "./validators/auth.validators";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "signin",
      id: "signin",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials): Promise<User | null> {
        const result = SignInSchema.safeParse(credentials);
        if (!result.success) {
          throw new Error("Input Validation Failed");
        }
        const { email, password } = result.data;
        const user = await db.user.findUnique({
          where: {
            email: email,
          },
          select: {
            email: true,
            id: true,
            name: true,
            password: true,
            Role: true,
            emailVerified: true,
            image: true,
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password!);
        if (!passwordMatch) {
          throw new Error("Email or Password is incorrect");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.Role,
          emailVerified: user.emailVerified !== null,
          image: user.image ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }): Promise<boolean> {
      if (!user.email || !user.name || !account?.provider) {
        return false;
      }

      const existingUser = await db.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (existingUser) {
        return true;
      }

      await db.user.create({
        data: {
          email: user.email,
          name: user.name,
          provider: account.provider,
          image: user.image,
          emailVerified: true,
        },
      });
      return true;
    },

    async jwt({ token, user, trigger, session }): Promise<JWT> {
      if (trigger === "update" && session?.user) {
        return {
          ...token,
          ...session.user,
        };
      }

      if (user) {
        const loggedInUser = await db.user.findUnique({
          where: {
            id: user.id,
          },
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            Role: true,
            image: true,
          },
        });

        if (!loggedInUser) return token;

        return {
          id: loggedInUser.id,
          name: loggedInUser.name,
          email: loggedInUser.email,
          emailVerified: loggedInUser.emailVerified !== null,
          role: loggedInUser.Role,
          image: loggedInUser.image ?? null,
        };
      }
      return token;
    },

    async session({ session, token }): Promise<Session> {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.emailVerified = token.emailVerified;
        session.user.role = token.role;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
