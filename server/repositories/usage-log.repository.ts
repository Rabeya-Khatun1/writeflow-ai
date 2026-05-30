import type { Prisma } from "@prisma/client";
import type { UsageAction } from "@/types";
import { prisma } from "@/lib/db/prisma";

export const usageLogRepository = {
  async create(params: {
    userId: string;
    documentId?: string;
    templateId?: string;
    reviewId?: string;
    action?: UsageAction;
    prompt: string;
    tokensUsed: number;
    creditsSpent: number;
    model: string;
    metadata?: Prisma.InputJsonValue;
  }) {
    return prisma.usageLog.create({
      data: {
        userId: params.userId,
        documentId: params.documentId,
        templateId: params.templateId,
        reviewId: params.reviewId,
        action: params.action ?? "GENERATION",
        prompt: params.prompt,
        tokensUsed: params.tokensUsed,
        creditsSpent: params.creditsSpent,
        model: params.model,
        metadata: params.metadata,
      },
    });
  },

  async countThisMonth(userId: string, action?: UsageAction): Promise<number> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    return prisma.usageLog.count({
      where: {
        userId,
        createdAt: { gte: startOfMonth },
        ...(action ? { action } : {}),
      },
    });
  },

  async countGenerationsThisMonth(userId: string): Promise<number> {
    return this.countThisMonth(userId, "GENERATION");
  },
};

/** @deprecated Use usageLogRepository */
export const generationRepository = {
  create: usageLogRepository.create,
  countThisMonth: usageLogRepository.countGenerationsThisMonth,
};
