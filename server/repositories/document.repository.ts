import type { DocumentDTO, DocumentStatus, DocumentType } from "@/types";
import { countWords } from "@/lib/utils";
import { prisma } from "@/lib/db/prisma";
import type { Document } from "@prisma/client";

function toDTO(doc: Document): DocumentDTO {
  return {
    id: doc.id,
    title: doc.title,
    content: doc.content,
    type: doc.type as DocumentType,
    tone: doc.tone,
    status: doc.status as DocumentStatus,
    wordCount: doc.wordCount,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export const documentRepository = {
  async findByIdForUser(
    id: string,
    userId: string
  ): Promise<DocumentDTO | null> {
    const doc = await prisma.document.findFirst({
      where: { id, userId },
    });
    return doc ? toDTO(doc) : null;
  },

  async listByUser(userId: string, limit = 50): Promise<DocumentDTO[]> {
    const docs = await prisma.document.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
    return docs.map(toDTO);
  },

  async countByUser(userId: string): Promise<number> {
    return prisma.document.count({ where: { userId } });
  },

  async create(params: {
    userId: string;
    title: string;
    type: DocumentType;
    tone: string;
    content?: string;
  }): Promise<DocumentDTO> {
    const content = params.content ?? "";
    const doc = await prisma.document.create({
      data: {
        userId: params.userId,
        title: params.title,
        type: params.type,
        tone: params.tone,
        content,
        wordCount: countWords(content),
      },
    });
    return toDTO(doc);
  },

  async update(
    id: string,
    userId: string,
    data: Partial<{
      title: string;
      content: string;
      type: DocumentType;
      tone: string;
      status: DocumentStatus;
    }>
  ): Promise<DocumentDTO | null> {
    const existing = await prisma.document.findFirst({
      where: { id, userId },
    });
    if (!existing) return null;

    const doc = await prisma.document.update({
      where: { id },
      data: {
        ...data,
        ...(data.content !== undefined
          ? { wordCount: countWords(data.content) }
          : {}),
      },
    });
    return toDTO(doc);
  },

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await prisma.document.deleteMany({
      where: { id, userId },
    });
    return result.count > 0;
  },
};
