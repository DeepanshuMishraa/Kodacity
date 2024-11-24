import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    emailVerified: boolean;
    role: string;
    password?:string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      name: string;
      emailVerified: boolean;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    emailVerified: boolean;
    role: string;
  }
}
