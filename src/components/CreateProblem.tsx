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
import { X } from "lucide-react";

export default function CreateProblem() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ProblemSchemaType>({
    resolver: zodResolver(ProblemSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: Difficulty.EASY,
      tags: [],
      example: "",
    },
  });

  const onSubmit = async (data: ProblemSchemaType) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const response = await createProblem(data);

      if (response?.status === 201) {
        toast({
          title: "Success",
          description: "Problem created successfully",
          variant: "default",
        });
        router.push("/admin");
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: response?.message || "Failed to create problem",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      const currentTags = form.getValues("tags");

      if (!currentTags.includes(newTag)) {
        const updatedTags = [...currentTags, newTag];
        form.setValue("tags", updatedTags, { shouldValidate: true });
        e.currentTarget.value = "";
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    const updatedTags = currentTags.filter(tag => tag !== tagToRemove);
    form.setValue("tags", updatedTags, { shouldValidate: true });
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Problem</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-6">
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
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="example"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Example</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter an example input/output"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a clear example demonstrating the problem
                  </FormDescription>
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
              render={({ field }) => (
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
                    {field.value.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 rounded-full hover:bg-primary-foreground/20"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Creating..." : "Create Problem"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
