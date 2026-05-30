import type { DocumentType } from "@/types/document";

export type TemplateScope = "SYSTEM" | "USER";

export interface TemplateDTO {
  id: string;
  userId: string | null;
  scope: TemplateScope;
  name: string;
  slug: string;
  description: string;
  type: DocumentType;
  tone: string;
  prompt: string;
  isPublic: boolean;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}
