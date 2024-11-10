import { z } from "zod";

// leetcode like problem schema

export const ProblemSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.array(z.string()).min(1),
});

export type ProblemSchemaType = z.infer<typeof ProblemSchema>;
