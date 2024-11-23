"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getProblem } from "~/actions/queries";
import RestrictedPage from "./Restricted";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

// Define types
type Problem = {
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
};

type ProblemResponse = {
  status?: number;
  problem?: Problem[];
  error?: string;
};

export default function AdminDashComponent() {
  const { data: session, status } = useSession();
  const [problems, setProblems] = useState<ProblemResponse>({ problem: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await getProblem();
        setProblems(response);
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (status === "loading" || isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Card className="w-full">
          <CardContent className="flex justify-center items-center min-h-[200px]">
            <p className="text-gray-500">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (session?.user?.role !== "ADMIN") {
    return <RestrictedPage />;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Problem Dashboard</h1>
        <Link href="/admin/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create New Problem
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.problem?.map((problem, index) => (
          <Card key={index} className="w-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">{problem.title}</CardTitle>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {problem.description}
              </p>
            </CardContent>

            <CardFooter className="flex flex-wrap gap-2">
              {problem.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </CardFooter>

            <CardFooter className="pt-4 border-t">
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => console.log(`Edit ${problem.title}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-red-600 hover:bg-red-50"
                  onClick={() => console.log(`Delete ${problem.title}`)}
                >
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {(!problems.problem || problems.problem.length === 0) && (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No problems found</p>
            <Link href="/admin/create">
              <Button>Create Your First Problem</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
