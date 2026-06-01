import { NextResponse } from "next/server";
import { z } from "zod";
import { generateStructuredContent } from "@/lib/openai";

const generateSchema = z.object({
  prompt: z.string().trim().optional(),
  topic: z.string().trim().optional(),
  tone: z.string().trim().min(1, "Tone is required."),
  audience: z.string().trim().optional(),
}).refine((data) => {
  return data.prompt?.trim() || (data.topic?.trim() && data.audience?.trim());
}, {
  message: "Either a template prompt or both topic and audience are required.",
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  try {
    const result = await generateStructuredContent(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[POST /api/ai/generate]", error);

    return NextResponse.json(
      { error: "Failed to generate content. Please try again later." },
      { status: 500 }
    );
  }
}
