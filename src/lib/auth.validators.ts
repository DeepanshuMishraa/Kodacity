
"use server"
import { db } from "~/server/db";

interface Signup {
  email: string;
  password: string;
  name: string;
}

export async function signUp({ email, password, name }: Signup) {
  try {
    if (!email || !password || !name) {
      throw new Error("Please fill all fields");
    }

    const user = await db.user.create({
      data: {
        email,
        password,
        name,
        provider: "EMAIL",
      },
    });

    return user;
  } catch (err: any) {
    throw new Error(err);
  }
}
