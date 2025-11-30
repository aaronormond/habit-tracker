import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { goal } = await req.json();
    if (!goal) return NextResponse.json({ habits: [] });
    const t0 = performance.now();
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [{role: "user",
          content: `
          Generate exactly 3 daily tasks for this goal: "${goal}".
          Each task must be 3–6 words, actionable, simple, and phrased like a to-do item.
          Return a JSON object:
          {
            "habits": ["...", "...", "..."]
          }
          `
        }
      ],
    });
    const t1 = performance.now();
    console.log("OpenAI response time", t1 - t0);

    const data = JSON.parse(completion.choices[0].message?.content || "{}");
    return NextResponse.json(data);

  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ habits: [] });
  }
}
