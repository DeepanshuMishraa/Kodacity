import { getProblemByID } from "~/actions/queries";
import CodeEditorClient from "~/components/CodeEditorClient";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const response = await getProblemByID(id);

  if (response.status !== 200 || !response.problem) {
    return (
      <div className="flex h-screen items-center justify-center">z
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-lg text-red-500">
              {response.message || "An error occurred."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const problem = response.problem;

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="w-full overflow-y-auto border-b p-4 lg:w-1/2 lg:border-b-0 lg:border-r">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                {problem.title}
              </CardTitle>
              <Badge
                variant={
                  problem.difficulty === "EASY"
                    ? "secondary"
                    : problem.difficulty === "MEDIUM"
                      ? "default"
                      : "destructive"
                }
              >
                {problem.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="mb-2 text-lg font-semibold">Problem Description</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {problem.description}
            </p>
            <Separator className="my-4" />
            <h2 className="mb-2 text-lg font-semibold">Example</h2>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4">
              <code className="whitespace-pre-wrap break-words font-mono text-sm">
                {problem.example}
              </code>
            </pre>
          </CardContent>
        </Card>
      </div>
      <div className="w-full lg:w-1/2">
        <CodeEditorClient problem={problem} />
      </div>
    </div>
  );
}
