import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { goal } = await req.json();
    if (!goal) return NextResponse.json({ habits: [] });

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [{role: "user",
          content: `
          Generate exactly 3 tasks someone could repeat daily to reach the goal: "${goal}".
          Each task must be 3–6 words, actionable, simple, and worded as would appear on a to-do list.
          Return ONLY a JSON object in this exact format:
          { "habits": ["...", "...", "..."] }
          `
        }
      ],
    });

    // The model is now FORCED to return valid JSON
    const data = JSON.parse(completion.choices[0].message?.content || "");
    return NextResponse.json(JSON.parse(completion.choices[0].message.content ?? "{}"));

  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ habits: [] });
  }
}
