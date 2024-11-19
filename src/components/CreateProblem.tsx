"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Difficulty } from "@prisma/client";
import {
  ProblemSchema,
  ProblemSchemaType,
} from "~/lib/validators/problems.validators";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { createProblem } from "~/actions/problems.actions";
import { useToast } from "~/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CreateProblem() {
  const [tags, setTags] = useState<string[]>([]);
  const {toast} = useToast();
  const router = useRouter();


  const form = useForm<ProblemSchemaType>({
    resolver: zodResolver(ProblemSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: Difficulty.EASY,
      tags: [],
    },
  });

  const onSubmit = async(data: ProblemSchemaType) => {
    try {
      const response = await createProblem(data);
      if(response?.status===201){
        toast({
            title: "Problem Created Successfully",
            description: "Problem has been successfully created",
            variant: "default",
        })

        router.refresh();
      }else{
        toast({
            title: "Error creating problem",
            description: response?.message || "Internal server error",
            variant: "destructive",
        })
      }
    } catch (err) {
        toast({
            title: "Error creating problem",
            description: "Internal server error",
            variant: "destructive",
        })
      console.log(err);
    }
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault();
      setTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = "";
      form.setValue("tags", [...tags, e.currentTarget.value]);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Problem</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter problem title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter problem description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Difficulty).map((diff) => (
                        <SelectItem key={diff} value={diff}>
                          {diff.charAt(0) + diff.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter tags and press Enter"
                      onKeyDown={handleAddTag}
                    />
                  </FormControl>
                  <FormDescription>
                    Press Enter to add a tag. At least one tag is required.
                  </FormDescription>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-primary px-2 py-1 text-sm text-primary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          Create Problem
        </Button>
      </CardFooter>
    </Card>
  );
}
