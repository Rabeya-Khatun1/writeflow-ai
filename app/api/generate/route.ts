import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/auth/get-current-user";
import { generateSchema } from "@/lib/validations/document";
import { aiService, InsufficientCreditsError } from "@/server/services/ai.service";

export async function POST(request: Request) {
  const profile = await getCurrentProfile();
  if (!profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI is not configured. Set OPENAI_API_KEY." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const parsed = generateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const result = await aiService.generate(profile.id, parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof InsufficientCreditsError) {
      return NextResponse.json(
        { error: "Insufficient credits. Upgrade your plan for more." },
        { status: 402 }
      );
    }
    console.error("[POST /api/generate]", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
