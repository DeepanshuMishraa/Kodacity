"use server";

import { db } from "~/server/db";

export const getProblem = async () => {
  try {
    const problems = await db.problem.findMany({
      select: {
        title: true,
        description: true,
        difficulty: true,
        tags: true,
        id:true
      },
    });

    return {
      status: 201,
      problem: problems,
    };
  } catch (err: any) {
    // console.error("Error getting problem:", err);

    return {
      message: "Error getting problem",
      status: 500,
    };
  }
};
