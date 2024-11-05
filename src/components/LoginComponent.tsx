"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { LoaderCircleIcon } from "lucide-react";
import { signIn } from "~/lib/auth-client";
import { SignInValidator } from "~/lib/auth.validators";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    await signIn.email(
      {
        email: email,
        password: password,
      },
      {
        onRequest: () => {
          //show loading
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  }

  return (
    <Card className="w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <FaGithub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline">
            <FaGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" onClick={onSubmit}>
          {isLoading ? (
            <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Sign In
        </Button>
        <p className="text-md mt-2 text-center text-gray-700">
          New Here?{" "}
          <a href="/register" className="text-blue-500 underline">
            Join here
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
