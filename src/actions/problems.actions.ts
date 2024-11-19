'use server'

import { getServerSession } from "next-auth";
import { ProblemSchema } from "~/lib/validators/problems.validators";
import { db } from "~/server/db";

export const createProblem = async (_data: unknown) => {
  try {
    const data = ProblemSchema.parse(_data);
    const session = await getServerSession();

    if (session?.user.role == "ADMIN") {
      //create Problem
      const problem = await db.problem.create({
        data: {
          title: data.title,
          description: data.description,
          difficulty: data.difficulty,
          tags: data.tags,
          userId: session?.user.id,
        },
      });

      return { message: "Problem Created Successfully", status: 201, problem };
    }
  } catch (err) {
    throw new Error(`Error creating problem: ${err}`);
  }
};
