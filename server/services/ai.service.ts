import type { DocumentType, GenerateContentInput, GenerateContentResult } from "@/types";
import { CREDITS_PER_GENERATION } from "@/lib/constants";
import { DEFAULT_MODEL, openai } from "@/lib/openai/client";
import { documentRepository } from "@/server/repositories/document.repository";
import { usageLogRepository } from "@/server/repositories/usage-log.repository";
import { userRepository } from "@/server/repositories/user.repository";

const TYPE_INSTRUCTIONS: Record<DocumentType, string> = {
  BLOG:
    "Write a well-structured blog post with a compelling headline, introduction, subheadings, and conclusion. Use markdown formatting.",
  EMAIL:
    "Write a professional email with a clear subject line suggestion, greeting, body, and sign-off.",
  SOCIAL:
    "Write engaging social media copy. Keep it concise and include relevant hashtags where appropriate.",
  PRODUCT:
    "Write a persuasive product description highlighting benefits, features, and a call to action.",
  AD_COPY:
    "Write compelling ad copy with a strong headline, primary text, and call to action. Keep it punchy.",
  CUSTOM: "Write high-quality content based on the user's brief.",
};

function buildSystemPrompt(type: DocumentType, tone: string): string {
  return `You are WriteFlow AI, an expert content writer. ${TYPE_INSTRUCTIONS[type]}
Write in a ${tone} tone. Output only the requested content — no meta commentary or preamble.
Use markdown when it improves readability.`;
}

export class InsufficientCreditsError extends Error {
  constructor() {
    super("Insufficient credits");
    this.name = "InsufficientCreditsError";
  }
}

export const aiService = {
  async generate(
    userId: string,
    input: GenerateContentInput
  ): Promise<GenerateContentResult> {
    const user = await userRepository.findById(userId);
    if (!user || user.credits < CREDITS_PER_GENERATION) {
      throw new InsufficientCreditsError();
    }

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(input.type, input.tone),
        },
        { role: "user", content: input.prompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const content =
      completion.choices[0]?.message?.content?.trim() ??
      "Unable to generate content. Please try again.";

    const tokensUsed = completion.usage?.total_tokens ?? 0;

    await userRepository.deductCredits(userId, CREDITS_PER_GENERATION);

    if (input.documentId) {
      await documentRepository.update(input.documentId, userId, {
        content,
        ...(input.title ? { title: input.title } : {}),
      });
    }

    await usageLogRepository.create({
      userId,
      documentId: input.documentId,
      action: "GENERATION",
      prompt: input.prompt.slice(0, 500),
      tokensUsed,
      creditsSpent: CREDITS_PER_GENERATION,
      model: DEFAULT_MODEL,
    });

    const updatedUser = await userRepository.findById(userId);

    return {
      content,
      tokensUsed,
      creditsRemaining: updatedUser?.credits ?? 0,
    };
  },
};
