"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useToast } from "~/hooks/use-toast"
import { PasswordInput } from "~/components/PasswordInput"
import { Manrope } from "next/font/google"

const man = Manrope({
  weight: ["400", "700"],
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

export default function SignupForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       await signUp.email(
//         {
//           email,
//           password,
//           name,
//         },
//         {
//           onSuccess: () => {
//             toast({
//               title: "Account created!",
//               description: "You have successfully created an account",
//             })
//             router.push("/login")
//           },
//           onRequest: () => {
//             toast({
//               title: "Creating account..",
//               description: "Please wait while we create your account",
//             })
//           },
//           onError: (ctx) => {
//             toast({
//               title: "Error signing up",
//               description: ctx.error.message,
//               variant: "destructive",
//             })
//           },
//         }
//       )
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

  return (
    <>
      <div
        className={`flex min-h-screen items-center justify-center bg-black ${man.className}`}
      >
        <div className="grid w-full max-w-[1200px] grid-cols-2 gap-8">
          <div className="flex flex-col justify-between p-6">
            <div>
              <h1 className="mb-16 text-xl font-semibold text-white">
                kodacity
              </h1>
              <div className="max-w-[360px]">
                <h2 className="text-4xl font-semibold text-white">Sign up</h2>
                <p className="mt-3 text-[17px] text-gray-300">
                  Create an account to start your coding journey.
                </p>

                <form className="mt-8 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="mt-1 block w-full rounded-[4px] border-0 bg-[#111111] px-3 py-2 text-white shadow-sm ring-1 ring-inset ring-[#222222] placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-[#333333]"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="mt-1 block w-full rounded-[4px] border-0 bg-[#111111] px-3 py-2 text-white shadow-sm ring-1 ring-inset ring-[#222222] placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-[#333333]"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm text-white"
                    >
                      Password
                    </label>
                    <PasswordInput
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-[4px] bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-100"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Sign up"
                      )}
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-300">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-semibold text-white hover:underline"
                  >
                    Log in
                  </a>{" "}
                  instead.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-[#030303] p-6">
            <div className="max-w-md">
              <blockquote>
                <p className="text-[26px] font-medium leading-tight text-white">
                  "Coding is not just about algorithms; it's about unleashing
                  creativity and solving real-world problems. Join us and turn
                  your ideas into reality."
                </p>
                <footer className="mt-6">
                  <p className="text-base font-medium text-white">
                    Alex Johnson
                  </p>
                  <p className="text-base text-gray-400">
                    Senior Software Engineer
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
