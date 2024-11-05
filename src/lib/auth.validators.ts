
"use server"
import { db } from "~/server/db";
import bcrypt from "bcryptjs";

interface Signup {
  email: string;
  password: string;
  name: string;
}

interface SignIn {
  email: string;
  password: string;
}

export async function signUp({ email, password, name }: Signup) {
  try {
    if (!email || !password || !name) {
      throw new Error("Please fill all fields");
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hashSync(password,salt);

    const user = await db.user.create({
      data: {
        email,
        password:hashedPassword,
        name,
        provider: "EMAIL",
      },
    });

    return user;
  } catch (err: any) {
    throw new Error(err);
  }
}


export async function SignInValidator({email,password}:SignIn){
    try{
        if(!email || !password){
            throw new Error("Please fill all fields");
        }
        const user = await db.user.findUnique({
            where:{
                email:email
            }
        })
        if(!user){
            throw new Error("User not found")
        }
        const isMatch = await bcrypt.compare(password,user?.password!);
        if(!isMatch){
            throw new Error("Invalid Credentials")
        }
        return user
    }catch(err:any){
        throw new Error(err)
    }
}
