'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Lock, ArrowLeft } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { redirect } from 'next/navigation'

export default function RestrictedPage() {
  const [showMessage, setShowMessage] = useState(false)
  const lockControls = useAnimation()

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const rotateLock = async () => {
    await lockControls.start({ rotate: 360, transition: { duration: 0.5 } })
    lockControls.set({ rotate: 0 })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center space-y-8 p-12 max-w-md w-full">
        <motion.div
          animate={lockControls}
          className="inline-block cursor-pointer"
          onClick={rotateLock}
        >
          <Lock className="w-20 h-20 text-gray-800" />
        </motion.div>

        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Access Denied</h1>

        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showMessage ? 1 : 0, y: showMessage ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600"
          >
            This area is off-limits.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showMessage ? 1 : 0, y: showMessage ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600"
          >
            You'll need special permission to proceed.
          </motion.p>
        </div>

        <div className="pt-8">
          <Button
            variant="outline"
            className="group transition-all duration-300 ease-in-out border-gray-300 hover:border-gray-400 text-gray-700"
            onClick={() => redirect("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </Button>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gray-200 rounded-full"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + 'vw',
              top: Math.random() * 100 + 'vh',
            }}
            animate={{
              scale: [0.7, 1, 0.7],
              transition: {
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
