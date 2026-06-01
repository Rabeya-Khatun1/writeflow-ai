import { NextResponse } from "next/server";
import { z } from "zod";
import { rewriteText } from "@/lib/openai";

const rewriteSchema = z.object({
  text: z.string().trim().min(1, "Text is required."),
  tone: z.enum(["formal", "casual", "persuasive", "friendly"]),
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

  const parsed = rewriteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  try {
    const result = await rewriteText(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[POST /api/ai/rewrite]", error);
    return NextResponse.json(
      { error: "Failed to rewrite text. Please try again later." },
      { status: 500 }
    );
  }
}
