
"use server"
import { db } from "~/server/db";
import bcrypt from "bcryptjs";

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
