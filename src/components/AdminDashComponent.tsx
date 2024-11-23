"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { getProblem } from "~/actions/problems.actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";

interface Problem {
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
}

interface ProblemResponse {
  status: number;
  problem: Problem[];
  error?: string;
  message?: string;
}

export default function AdminDashboardComponent() {
  const [problems, setProblems] = useState<ProblemResponse>({
    status: 200,
    problem: [],
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await getProblem();
        setProblems({
            ...res,
            problem: res.problem || []
        });
      } catch (error) {
        setProblems({
          status: 500,
          problem: [],
          message: "Error fetching problems",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Kodacity Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Link href="/admin/create">
              <Button>Create Problem</Button>
            </Link>
          </div>
          <div className="grid gap-4">
            {problems.problem && problems.problem.map((problem, index) => (
              <Card key={index} className="w-full">
                <CardHeader>
                  <CardTitle>{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{problem.description}</p>
                  <p className="mb-2">Difficulty: {problem.difficulty}</p>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
