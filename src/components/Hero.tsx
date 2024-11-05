import { cn } from "~/lib/utils";
import AnimatedGridPattern from "./ui/animated-grid-pattern"
import { Montserrat, Poppins, Rubik } from "next/font/google";
import { RainbowButton } from "./ui/rainbow-button";

const Poppin = Poppins({
    weight: ["100", "400", "700"],
    style: "normal",
    subsets: ["latin"],
    display: "swap",
})

export function Hero() {
  return (
    <div
      className={`bg-background motion-preset-slide-right relative flex h-screen w-full flex-col items-center justify-center space-y-9 overflow-hidden rounded-lg border p-20 motion-duration-700 md:shadow-xl ${Poppin.className}`}
    >
      <p className="z-10 whitespace-pre-wrap text-center text-6xl font-medium tracking-tighter text-black dark:text-white">
        Code Beyond Limits
      </p>
      <p className="tracking-tighter z-10 text-center text-2xl font-normal text-gray-700 dark:text-white">
        Advanced learning ecosystem that
        <br /> adapts to your journey. Free up to 500 practice runs.
      </p>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <RainbowButton>Apply for Waitlist</RainbowButton>
    </div>
  );
}
