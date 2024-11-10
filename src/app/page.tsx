import Link from "next/link";
import { Hero } from "~/components/Hero";
import LandingNavbar from "~/components/Navbar";
import { TechStacks } from "~/components/TechStacks";

export default function HomePage() {
  return (
    <>
      <LandingNavbar />
      <Hero />
      <TechStacks />
    </>
  );
}
