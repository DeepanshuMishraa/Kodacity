import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface PasswordInputProps {
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export function PasswordInput({ id, value, onChange, placeholder }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        required
        className="mt-1 block w-full rounded-[4px] border-0 bg-[#111111] px-3 py-2 text-white shadow-sm ring-1 ring-inset ring-[#222222] placeholder:text-gray-500 focus:ring-1 focus:ring-inset focus:ring-[#333333]"
        placeholder={placeholder}
      />
      <Button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none rounded-full "
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 " />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </Button>
    </div>
  )
}
