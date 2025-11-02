import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { streak = 0 } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      { role: "system", content: "You are a short, positive, non-cringe habit coach." },
      { role: "user", content: `I have a ${streak}-day streak. Give me 1-2 sentences of motivation.` },
    ],
  });

  const message = completion.choices[0].message.content;
  return NextResponse.json({ message });
}

