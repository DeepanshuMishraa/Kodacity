"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signUp } from "~/actions/auth.actions";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/hooks/use-toast";
import {
  SignUpSchema,
  signUpSchemaType,
} from "~/lib/validators/auth.validators";
import { Manrope } from "next/font/google";

const man = Manrope({
  weight: ["400", "700"],
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

export const Signup = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<signUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function signupHandler(data: signUpSchemaType) {
    try {
      const response = await signUp(data);
      if (!response.status) {
        toast({
          title: response.message || "Something went wrong",
          variant: "destructive",
        });
      } else {
        toast({
          title: response.message || "Signup successful! Welcome to Kodacity!",
          variant: "default",
        });

        router.push("/login");
      }
    } catch {
      toast({
        title: "something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <div
      className={`flex h-full min-h-screen bg-black text-white ${man.className}`}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex-grow p-8 lg:p-12">
          <div className="mx-auto max-w-md">
            <h1 className="text-2xl font-semibold">kodacity</h1>

            <div className="mt-16">
              <h2 className="text-4xl font-semibold">Sign up</h2>
              <p className="mt-3 text-lg text-gray-400">
                Create an account to start your coding journey.
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(signupHandler)}
                  className="mt-8 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your name"
                            className="border-0 bg-[#111] text-white placeholder-gray-500 focus-visible:ring-white/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="you@example.com"
                            className="border-0 bg-[#111] text-white placeholder-gray-500 focus-visible:ring-white/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              {...field}
                              placeholder="Create a password"
                              className="border-0 bg-[#111] text-white placeholder-gray-500 focus-visible:ring-white/20"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                              {showPassword ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="h-10 w-full bg-white text-black hover:bg-gray-200"
                    aria-label="submit"
                  >
                    {form.formState.isSubmitting ? "Please wait..." : "Sign up"}
                  </Button>
                </form>
              </Form>

              <p className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-white hover:underline">
                  Log in
                </Link>{" "}
                instead.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden flex-1 lg:flex lg:items-center">
        <div className="bg-[#030303` flex h-full w-full items-center p-12">
          <div className="mx-auto max-w-lg">
            <blockquote className="text-[26px] font-medium leading-tight text-white">
              "Coding is not just about algorithms; it's about unleashing
              creativity and solving real-world problems. Join us and turn your
              ideas into reality."
            </blockquote>
            <div className="mt-6">
              <p className="text-base font-medium text-white">Alex Johnson</p>
              <p className="text-base text-gray-400">
                Senior Software Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
