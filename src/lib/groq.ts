import Groq from "groq-sdk";
import { z } from "zod";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const ProjectSchema = z.object({
  id: z.number(),
  domain: z.string(),
  name: z.string(),
  description: z.string(),
  skill_level: z.string().optional(),
  tech_stack: z.array(z.string()).optional(),
});

const ProjectsArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

interface CacheProject {
  projects: Project[];
  timestamp: number;
}

let projectCache: CacheProject | null = null;

const cacheDuration = 24 * 60 * 60 * 1000;

async function generateNewProjects(): Promise<Project[]> {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI named Kodacity designed to provide users with 10 unique and innovative project ideas daily. Each idea should span different domains and include a brief description. The ideas should be practical, thought-provoking, and cater to various skill levels and tech stacks. Return ONLY the JSON array without any additional text or markdown. Make sure the JSON response includes these details about the project : (id,domain,name,description,skill_level,tech_stack). The tech_stack must always be an array of strings.",
        },
      ],
      model: "llama3-8b-8192",
    });

    const content = response.choices[0]?.message.content || "[]";
    const jsonMatch = content.match(/\[.*\]/s);

    if (!jsonMatch) {
      console.error("No JSON array found in response");
      return [];
    }

    try {
      const parsedData = JSON.parse(jsonMatch[0]);
      // Validate the parsed data against our schema
      const validatedData = ProjectsArraySchema.parse(parsedData);
      return validatedData;
    } catch (error) {
      console.error("Failed to parse or validate JSON response:", error);
      return [];
    }
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    return [];
  }
}

export async function getDailyProjects(): Promise<Project[]> {
  const currentTime = Date.now();

  if (projectCache && currentTime - projectCache.timestamp < cacheDuration) {
    return projectCache.projects;
  }

  const newProjects = await generateNewProjects();

  projectCache = {
    timestamp: currentTime,
    projects: newProjects,
  };

  return newProjects;
}

export function clearCache() {
  projectCache = null;
}
