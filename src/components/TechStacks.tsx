"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconCloud from "~/components/ui/icon-cloud";
import HyperText from "./ui/hyper-text";
import { Shuffle } from "lucide-react";
import { Button } from "./ui/button";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const categories = {
  Languages: ["typescript", "javascript", "dart", "java"],
  Frameworks: ["react", "flutter", "android", "express", "nextdotjs"],
  Databases: ["postgresql", "firebase"],
  Cloud: ["amazonaws", "vercel"],
  Tools: [
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
  ],
  Testing: ["testinglibrary", "jest", "cypress"],
};

export function TechStacks() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedSlugs, setDisplayedSlugs] = useState(slugs);

  useEffect(() => {
    if (selectedCategory === "All") {
      setDisplayedSlugs(slugs);
    } else {
      setDisplayedSlugs(categories[selectedCategory] || []);
    }
  }, [selectedCategory]);

  const shuffleSlugs = () => {
    setDisplayedSlugs((prevSlugs) =>
      [...prevSlugs].sort(() => Math.random() - 0.5),
    );
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HyperText
          className="text-center text-3xl font-bold text-primary md:text-4xl lg:text-5xl"
          text="Master Multiple Technologies"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-2xl text-center text-muted-foreground"
      >
        Explore a wide range of programming languages, frameworks, and tools.
        Enhance your skills with our curated problems and projects.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {["All", ...Object.keys(categories)].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="text-sm"
          >
            {category}
          </Button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IconCloud iconSlugs={displayedSlugs} />
          </motion.div>
        </AnimatePresence>
        <motion.div
          className="absolute right-2 top-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={shuffleSlugs}
            title="Shuffle icons"
          >
            <Shuffle className="h-4 w-4" />
            <span className="sr-only">Shuffle icons</span>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center text-sm text-muted-foreground"
      >
        Click on a category to filter or use the shuffle button to randomize the
        icons
      </motion.div>
    </div>
  );
}
