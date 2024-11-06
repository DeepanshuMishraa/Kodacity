"use client"

import { useState } from "react"
import { signIn } from "~/lib/auth-client"
import { useRouter } from "next/navigation"
import { useToast } from "~/hooks/use-toast"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { LoaderCircleIcon } from "lucide-react"
import { PasswordInput } from "~/components/PasswordInput"
import { Manrope } from "next/font/google"

const man = Manrope({
    weight: ["400", "700"],
    style: "normal",
    display: "swap",
    subsets: ["latin"],
})

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

  const handleSocialLogin = async (provider: "github" | "google") => {
    try {
      setIsLoading(true)
      await signIn.social(
        {
          provider: provider,
        },
        {
          onRequest: () => {
            toast({
              title: `Connecting to ${provider}...`,
              description: "Please complete the authentication process",
            })
          },
          onSuccess: () => {
            toast({
              title: "Success!",
              description: "You have been successfully signed in",
            })
            router.push("/dashboard")
          },
          onError: (ctx) => {
            toast({
              title: "Error signing in",
              description: ctx.error.message,
              variant: "destructive",
            })
          },
        }
      )
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`flex h-screen items-center justify-center bg-black ${man.className}`}
    >
      <div className="grid w-full max-w-[1200px] grid-cols-2 gap-8">
        <div className="flex flex-col justify-between p-6">
          <div>
            <h1 className="mb-8 text-xl font-semibold text-white">kodacity</h1>
            <div className="max-w-[360px]">
              <h2 className="text-4xl font-semibold text-white">Log in</h2>
              <p className="mt-3 text-[17px] text-gray-300">
                Welcome back! Enter your email and password to continue.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="mt-1 block w-full rounded-[4px] border-0 bg-[#111111] px-3 py-2 text-white shadow-sm ring-1 ring-inset ring-[#222222] placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-[#333333]"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm text-white">
                    Password
                  </label>
                  <PasswordInput
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>

                <div>
                  <a
                    href="/recover"
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    Forgot your password? Recover here.
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full items-center justify-center rounded-[4px] bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-100"
                  >
                    {isLoading ? (
                      <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Log in
                  </button>
                </div>
              </form>

              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#222222]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-black px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("github")}
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#111111] px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-[#222222] hover:bg-[#191919] disabled:opacity-50"
                >
                  {isLoading ? (
                    <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    <FaGithub className="h-4 w-4" />
                  )}
                  GitHub
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#111111] px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-[#222222] hover:bg-[#191919] disabled:opacity-50"
                >
                  {isLoading ? (
                    <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    <FaGoogle className="h-4 w-4" />
                  )}
                  Google
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-gray-300">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-semibold text-white hover:underline"
                >
                  Sign up
                </a>{" "}
                instead.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6">
          <div className="max-w-md">
            <blockquote>
              <p className="text-[26px] font-medium leading-tight text-white">
                "Truly the best app I've used to keep myself organized in
                school. Makes my workflow so much more efficient."
              </p>
              <footer className="mt-6">
                <p className="text-base font-medium text-white">Eric Smith</p>
                <p className="text-base text-gray-400">Graduate Student</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
