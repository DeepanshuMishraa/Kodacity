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

export default function CodeEditorClient({ problem }: { problem: any }) {
  const [code, setCode] = useState(
    `// Write your solution for "${problem.title}" here`,
  );

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleReset = () => {
    setCode(`// Write your solution for "${problem.title}" here`);
  };

  const handleRun = () => {
    // Implement your run logic here
    console.log("Running code:", code);
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Code Editor</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
          }}
        />
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcwIcon className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={handleRun}>
          <PlayIcon className="mr-2 h-4 w-4" />
          Run
        </Button>
      </CardFooter>
    </Card>
  );
}
