'use server'

import { SignUpSchema } from "~/lib/validators/auth.validators"
import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { Database } from "lucide-react";

export const signUp = async (_data: unknown) => {
    const data = SignUpSchema.parse(_data);

    const userExist = await db.user.findUnique({
        where: {
            email: data.email
        }
    });

    if (userExist) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(data.password, salt);

    try {

        const isAdmin = data.email === process.env.ADMIN_EMAIL &&
                       data.password === process.env.ADMIN_PASSWORD;


        await db.user.create({
            data: {
                email:data.email,
                name: data.name,
                password: hashedPassword,
                Role: isAdmin ? "ADMIN" : "USER"
            }
        });

        return {
            message: isAdmin ? "Admin Created Successfully" : "User Created Successfully",
            status: 201
        };
    } catch (err) {
        throw new Error(`Error creating user: ${err}`);
    }
}
