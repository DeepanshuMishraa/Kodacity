import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an AI Designed to help the users with unique and different project ideas and roadmap daily based on different tech stack and domains",
      },
      {
        role: "user",
        content: "I am looking for a project idea in Kubernetes",
      },
    ],
    model: "llama3-8b-8192",
  });
}
