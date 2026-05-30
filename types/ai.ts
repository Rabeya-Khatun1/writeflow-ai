import type { DocumentType } from "@/types/document";

export interface GenerateContentInput {
  prompt: string;
  type: DocumentType;
  tone: string;
  documentId?: string;
  title?: string;
}

export interface GenerateContentResult {
  content: string;
  tokensUsed: number;
  creditsRemaining: number;
}
