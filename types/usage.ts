export type UsageAction = "GENERATION" | "REVIEW" | "REWRITE" | "EXPORT";

export interface UsageLogDTO {
  id: string;
  userId: string;
  documentId: string | null;
  templateId: string | null;
  reviewId: string | null;
  action: UsageAction;
  prompt: string;
  tokensUsed: number;
  creditsSpent: number;
  model: string;
  createdAt: string;
}
