import { getGroqChatCompletion } from "~/lib/groq";

export default async function Projects() {
  const res = await getGroqChatCompletion();

  return (
    <div>
      <h1>Projects</h1>
      <p>{res.choices[0]?.message?.content || ""}</p>
    </div>
  );
}
