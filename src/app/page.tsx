import Link from "next/link";
import { Hero } from "~/components/Hero";
import LandingNavbar from "~/components/Navbar";

export default function HomePage() {
  return (
    <>
    <LandingNavbar/>
    <Hero/>
    </>
  );
}
