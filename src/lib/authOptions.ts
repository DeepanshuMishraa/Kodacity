import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import { SignInSchema } from "./validators/auth.validators";
import bcrypt from "bcryptjs";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
        name:"signin",
        id:"signin",
        credentials:{
            email:{label:'Email',type:"email",placeholder:"email"},
            password:{label:'Password',type:"password",placeholder:"password"}
        },
        async authorize(credentials):Promise<any>{
            const result = SignInSchema.safeParse(credentials);

            if(!result.success){
                throw new Error(
                    'Input Validation Failed',
                );
            }

            const {email,password} = result.data;
            const user = await db.user.findUnique({
                where:{
                    email:email
                },
                select:{
                    email:true,
                    id:true,
                    name:true,
                    password:true,
                    Role:true
                }
            })

            if(!user ){
                throw new Error('No user found');
            }

            const passwordMatch = await bcrypt.compare(password,user.password!);

            if(!passwordMatch){
                throw new Error("Email or Password is incorrect");
            }

            return {
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.Role,
            }

        }
    })
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
  pages:{
    signIn:'/login'
  }
} satisfies NextAuthOptions
