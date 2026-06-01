import OpenAI from "openai";
import { z } from "zod";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = "gpt-4.1-mini";

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not configured.");
}

export const openaiClient = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const structuredResponseSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  tags: z.array(z.string()).default([]),
  metaDescription: z.string().trim().min(1),
});

const rewriteResponseSchema = z.object({
  rewrittenText: z.string().trim().min(1),
});

export type StructuredContentResponse = z.infer<typeof structuredResponseSchema>;
export type RewriteResponse = z.infer<typeof rewriteResponseSchema>;

export async function generateStructuredContent(
  input: {
    prompt?: string;
    topic?: string;
    tone: string;
    audience?: string;
  }
): Promise<StructuredContentResponse> {
  const prompt = input.prompt?.trim()
    ? input.prompt.trim()
    : `Generate a high-quality piece of content based on the following inputs:
Topic: ${input.topic ?? ""}
Tone: ${input.tone}
Audience: ${input.audience ?? ""}

Return a strict JSON object with the following fields:
- title
- content
- tags (array of strings)
- metaDescription

Do not include any additional text outside the JSON object.`;

  const response = await openaiClient.responses.create({
    model: OPENAI_MODEL,
    input: [
      {
        role: "system",
        content:
          "You are an expert content writer. Respond only with valid JSON matching the requested schema.",
      },
      { role: "user", content: prompt },
    ],
    text: {
      format: {
        type: "json_object",
      },
    },
    temperature: 0.7,
    max_output_tokens: 800,
  });

  const parsed = (response as any).output_parsed;
  if (!parsed || typeof parsed !== "object") {
    throw new Error("OpenAI returned an invalid structured response.");
  }

  return structuredResponseSchema.parse(parsed);
}

export async function rewriteText(
  input: {
    text: string;
    tone: "formal" | "casual" | "persuasive" | "friendly";
  }
): Promise<RewriteResponse> {
  const prompt = `Rewrite the following text in a ${input.tone} tone. Preserve the meaning while improving clarity and flow.

Text:
${input.text}

Return only the rewritten text in a JSON object with the field rewrittenText.`;

  const response = await openaiClient.responses.create({
    model: OPENAI_MODEL,
    input: [
      {
        role: "system",
        content:
          "You are an expert editor that rewrites text clearly and professionally. Respond only with valid JSON matching the requested schema.",
      },
      { role: "user", content: prompt },
    ],
    text: {
      format: {
        type: "json_object",
      },
    },
    temperature: 0.7,
    max_output_tokens: 800,
  });

  const parsed = (response as any).output_parsed;
  if (!parsed || typeof parsed !== "object") {
    throw new Error("OpenAI returned an invalid rewrite response.");
  }

  return rewriteResponseSchema.parse(parsed);
}
