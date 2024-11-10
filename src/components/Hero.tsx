"use client";

import { cn } from "~/lib/utils";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import { Poppins } from "next/font/google";
import { RainbowButton } from "./ui/rainbow-button";
import ImageLayer from "./Image";
import Link from "next/link";
import { ArrowRight, Code, Brain, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export function Hero() {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-6 md:p-20",
        poppins.className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 space-y-9 text-center"
      >
        <h1 className="mt-10 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Code
          </span>{" "}
          Beyond{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Limits
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg font-medium text-muted-foreground sm:text-xl md:text-2xl">
          Advanced learning ecosystem that
          <br className="hidden sm:inline" /> adapts to your journey.
          <br className="hidden sm:inline" /> Free up to 500 practice runs.
        </p>
      </motion.div>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "absolute inset-x-0 inset-y-[-30%] h-[160%] skew-y-12",
        )}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="z-10 mt-8 flex flex-col items-center space-y-8"
      >
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { icon: Code, text: "Advanced Coding Challenges" },
            { icon: Brain, text: "AI-Powered Learning Paths" },
            { icon: Zap, text: "Real-time Performance Tracking" },
            { icon: Users, text: "Collaborative Learning Community" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center space-x-2 rounded-full bg-secondary/10 px-4 py-2 text-secondary-foreground"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
        <Link href="/register">
          <RainbowButton className="group px-8 py-4 text-lg font-normal">
            Start Solving Problems
            <ArrowRight className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" />
          </RainbowButton>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-4 w-full max-w-4xl"
      >
        <ImageLayer />
      </motion.div>
    </div>
  );
}
