"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { PlayIcon, RotateCcwIcon } from "lucide-react";
import axios from "axios";
import { useToast } from "~/hooks/use-toast";

export default function CodeEditorClient({ problem }: { problem: any }) {
  const [code, setCode] = useState(
    `// Write your solution for "${problem.title}" here`,
  );
  const { toast } = useToast();
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleReset = () => {
    setCode(`// Write your solution for "${problem.title}" here`);
    setOutput("");
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await axios.post(
        "/api/2015-03-31/functions/function/invocations",
        {
          code,
          language: "cpp", // You can dynamically set this based on `problem.language`
        },
        { headers: { "Content-Type": "application/json" } },
      );

      const { body } = res.data;
      setOutput(body);

      toast({
        title: "Success",
        description: "Code executed successfully",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to run the code",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card className="flex h-full flex-col border border-gray-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Code Editor</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Editor
          height="300px"
          defaultLanguage={problem.language || "javascript"}
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            wordWrap: "on",
          }}
        />
        {output && (
          <div className="mt-4 rounded-md border border-gray-300 bg-gray-50 p-3">
            <h3 className="text-sm font-medium text-gray-700">Output:</h3>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-800">
              <code>{output}</code>
            </pre>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between space-x-4">
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex items-center"
        >
          <RotateCcwIcon className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center"
        >
          {isRunning ? (
            <>Running...</>
          ) : (
            <>
              <PlayIcon className="mr-2 h-4 w-4" />
              Run
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
