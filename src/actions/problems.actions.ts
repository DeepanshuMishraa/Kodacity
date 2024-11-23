"use server";

import { getServerSession } from "next-auth";
import { ProblemSchema } from "~/lib/validators/problems.validators";
import { db } from "~/server/db";
import { Prisma } from "@prisma/client";
import { authOptions } from "~/lib/authOptions";
import Error from "next/error";

export const createProblem = async (_data: unknown) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        message: "Unauthorized: Please sign in",
        status: 401,
      };
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user || user.Role !== "ADMIN") {
      return {
        message: "Forbidden: Admin access required",
        status: 403,
      };
    }

    const data = ProblemSchema.parse(_data);

    const problem = await db.problem.create({
      data: {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        tags: data.tags,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return {
      message: "Problem Created Successfully",
      status: 201,
      problem,
    };
  } catch (err: any) {
    console.error("Error creating problem:", err);

    // Handle Prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return {
          message: "A problem with this title already exists",
          status: 409,
        };
      }

      if (err.code === "P2025") {
        return {
          message: "User not found",
          status: 404,
        };
      }
    }

    // Handle Zod validation errors
    if (err.name === "ZodError") {
      return {
        message: "Invalid input data",
        status: 400,
        errors: err.errors,
      };
    }

    // Generic error response
    return {
      message: "Error creating problem",
      status: 500,
      error: err instanceof Error ? err : "Unknown error",
    };
  }
};

export const getProblem = async () => {
  try {
    const problems = await db.problem.findMany({
      select: {
        title: true,
        description: true,
        difficulty: true,
        tags: true,
      },
    });

    return {
      status: 201,
      problem: problems,
    };
  } catch (err: any) {
    console.error("Error getting problem:", err);

    return {
      message: "Error getting problem",
      status: 500,
    };
  }
};
