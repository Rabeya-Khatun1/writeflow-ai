import { z } from "zod";

const documentTypeEnum = z.enum([
  "BLOG",
  "EMAIL",
  "SOCIAL",
  "PRODUCT",
  "AD_COPY",
  "CUSTOM",
]);

export const createDocumentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  type: documentTypeEnum.default("CUSTOM"),
  tone: z.string().min(1).max(50).default("professional"),
  content: z.string().max(100_000).optional(),
});

export const updateDocumentSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().max(100_000).optional(),
  type: documentTypeEnum.optional(),
  tone: z.string().min(1).max(50).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

export const generateSchema = z.object({
  prompt: z.string().min(10, "Describe what you want (min 10 characters)").max(4000),
  type: documentTypeEnum,
  tone: z.string().min(1).max(50),
  documentId: z.string().cuid().optional(),
  title: z.string().max(200).optional(),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
export type GenerateInput = z.infer<typeof generateSchema>;
