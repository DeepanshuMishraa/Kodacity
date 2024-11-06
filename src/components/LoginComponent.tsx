"use client"

import { useState } from "react"
import { signIn } from "~/lib/auth-client"
import { useRouter } from "next/navigation"
import { useToast } from "~/hooks/use-toast"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { LoaderCircleIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    await signIn.email(
      {
        email: email,
        password: password,
      },
      {
        onRequest: () => {
          toast({
            title: "Signing you in..",
            description: "Please wait while we sign you in",
          })
        },
        onSuccess: () => {
          toast({
            title: "Welcome back!",
            description: "You have been successfully signed in",
          })
          router.push("/dashboard")
        },
        onError: (ctx) => {
          setIsLoading(false)
          toast({
            title: "Error signing in",
            description: ctx.error.message,
            variant: "destructive",
          })
        },
      }
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mt-16">
        <div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-pink-200 opacity-50"></div>
          <div className="relative p-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">Welcome Back</h2>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="w-full rounded-md border-gray-300 bg-white/50 shadow-sm backdrop-blur-sm focus:border-gray-500 focus:ring-gray-500"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="w-full rounded-md border-gray-300 bg-white/50 shadow-sm backdrop-blur-sm focus:border-gray-500 focus:ring-gray-500"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember" className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500" />
                  <Label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember me
                  </Label>
                </div>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-800">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700" disabled={isLoading}>
                {isLoading ? (
                  <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Sign In
              </Button>
            </form>
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 flex-shrink text-gray-600">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full border-gray-300 bg-white/50 backdrop-blur-sm hover:bg-gray-100"
                onClick={async () => {
                  await signIn.social({
                    provider: "github",
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/dashboard")
                      },
                    },
                  })
                }}
              >
                <FaGithub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 bg-white/50 backdrop-blur-sm hover:bg-gray-100"
                onClick={async () => {
                  await signIn.social({
                    provider: "google",
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/dashboard")
                      },
                    },
                  })
                }}
              >
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <p className="mt-8 text-center text-sm text-gray-600">
              New here?{" "}
              <a href="/register" className="font-medium text-gray-800 hover:underline">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
