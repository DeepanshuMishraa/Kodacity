import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { getDailyProjects, clearCache } from "~/lib/groq";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Code, Laptop, GraduationCap, RefreshCw } from "lucide-react";
import { Suspense } from "react";
import { AuthorizedNav } from "~/components/Navbar";

function ProjectSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="border-b bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800">
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </CardFooter>
    </Card>
  );
}

function ProjectSkeletonGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <ProjectSkeleton key={i} />
      ))}
    </div>
  );
}

async function ProjectsGrid() {
  const projects = await getDailyProjects();

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <CardHeader className="border-b bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {project.name}
              </h3>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Laptop className="h-3 w-3" />
                {project.domain}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
            {project.tech_stack &&
              Array.isArray(project.tech_stack) &&
              project.tech_stack.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <Code className="h-3 w-3" /> Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </CardContent>
          {project.skill_level && (
            <CardFooter className="bg-gray-50 dark:bg-gray-800">
              <Badge variant="secondary" className="flex items-center gap-1">
                <GraduationCap className="h-3 w-3" />
                {project.skill_level}
              </Badge>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <>
      <AuthorizedNav />
      <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-7xl mt-20">
          <div className="mb-12 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Daily AI-Generated Projects
            </h1>
            <form
              action={async () => {
                "use server";
                await clearCache();
              }}
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Projects
              </Button>
            </form>
          </div>
          <Suspense fallback={<ProjectSkeletonGrid />}>
            <ProjectsGrid />
          </Suspense>
        </div>
      </div>
    </>
  );
}
