"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "~/hooks/use-toast";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";
import { Manrope } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  SignInSchema,
  signInSchemaType,
} from "~/lib/validators/auth.validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { FaGithub, FaGoogle } from "react-icons/fa";

const manrope = Manrope({
  weight: ["400", "700"],
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const {data:session} = useSession();

  const form = useForm<signInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function signInHandler(data: signInSchemaType) {
    try {
      setIsLoading(true);
      const response = await signIn("signin", {
        ...data,
        redirect: false,
      });

      if (!response?.ok) {
        const errorMessage =
          response?.error?.includes("User") &&
          response?.error?.includes("does not exist")
            ? "User does not exist"
            : response?.error || "Internal server error";

        toast({
          title: errorMessage,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if(session?.user?.role == "ADMIN"){
        router.push("/admin/dashboard");
      }

      toast({
        title: "Login Successful, Welcome Back!",
        variant: "default",
      });

      router.push("/dashboard");
    } catch (err) {
      toast({
        title: "Internal server error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`${manrope.className} min-h-screen bg-black p-4 text-white`}
    >
      <div className="mx-auto flex min-h-screen max-w-screen-xl items-center justify-center p-4">
        <div className="grid w-full gap-8 md:grid-cols-2">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">kodacity</h2>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">Log in</h1>
                <p className="text-gray-400">
                  Welcome back! Enter your email and password to continue.
                </p>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(signInHandler)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Email</label>
                        <FormControl>
                          <input
                            {...field}
                            className="w-full rounded-lg border border-gray-800 bg-black px-4 py-3 text-white placeholder:text-gray-500 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
                            placeholder="Enter your email"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">
                          Password
                        </label>
                        <FormControl>
                          <div className="relative">
                            <input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="w-full rounded-lg border border-gray-800 bg-black px-4 py-3 text-white placeholder:text-gray-500 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
                              placeholder="Enter your password"
                              autoCapitalize="none"
                              autoComplete="current-password"
                              autoCorrect="off"
                              disabled={isLoading}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Link
                    href="/recover"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Forgot your password? Recover here.
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-lg bg-white py-3 text-black hover:bg-gray-200"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Log in
                </Button>
              </form>
            </Form>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={null}
                  type="button"
                  disabled={isLoading}
                  onClick={() =>
                    signIn("github", { callbackUrl: "/dashboard" })
                  }
                  className="flex w-full items-center justify-center rounded-lg border border-gray-800 bg-transparent px-4 py-3 text-white hover:bg-gray-900"
                >
                  <FaGithub />
                  GitHub
                </Button>

                <Button
                  variant={null}
                  type="button"
                  disabled={isLoading}
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                  className="flex w-full items-center justify-center rounded-lg border border-gray-800 bg-transparent px-4 py-3 text-white hover:bg-gray-900"
                >
                  <FaGoogle />
                  Google
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-white hover:underline">
                Sign up
              </Link>{" "}
              instead.
            </p>
          </div>

          <div className="hidden items-center justify-center md:flex">
            <div className="max-w-md space-y-4">
              <blockquote className="text-3xl font-medium leading-tight">
                "Truly the best app I've used to keep myself organized in
                school. Makes my workflow so much more efficient."
              </blockquote>
              <div className="space-y-1">
                <p className="text-xl">Eric Smith</p>
                <p className="text-gray-400">Graduate Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
