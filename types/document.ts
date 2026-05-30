export type DocumentType =
  | "BLOG"
  | "EMAIL"
  | "SOCIAL"
  | "PRODUCT"
  | "AD_COPY"
  | "CUSTOM";

export type DocumentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface DocumentDTO {
  id: string;
  title: string;
  content: string;
  type: DocumentType;
  tone: string;
  status: DocumentStatus;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}
