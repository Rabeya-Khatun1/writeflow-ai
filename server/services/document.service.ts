import type { DocumentDTO } from "@/types";
import { PLAN_LIMITS } from "@/lib/constants";
import type { CreateDocumentInput, UpdateDocumentInput } from "@/lib/validations/document";
import { documentRepository } from "@/server/repositories/document.repository";
import { userRepository } from "@/server/repositories/user.repository";

export class DocumentLimitError extends Error {
  constructor() {
    super("Document limit reached for your plan");
    this.name = "DocumentLimitError";
  }
}

export const documentService = {
  async list(userId: string): Promise<DocumentDTO[]> {
    return documentRepository.listByUser(userId);
  },

  async get(userId: string, id: string): Promise<DocumentDTO | null> {
    return documentRepository.findByIdForUser(id, userId);
  },

  async create(
    userId: string,
    input: CreateDocumentInput
  ): Promise<DocumentDTO> {
    const user = await userRepository.findById(userId);
    const plan = user?.plan ?? "FREE";
    const limit = PLAN_LIMITS[plan].documents;
    const count = await documentRepository.countByUser(userId);

    if (count >= limit) {
      throw new DocumentLimitError();
    }

    return documentRepository.create({
      userId,
      title: input.title,
      type: input.type,
      tone: input.tone,
      content: input.content,
    });
  },

  async update(
    userId: string,
    id: string,
    input: UpdateDocumentInput
  ): Promise<DocumentDTO | null> {
    return documentRepository.update(id, userId, input);
  },

  async remove(userId: string, id: string): Promise<boolean> {
    return documentRepository.delete(id, userId);
  },
};
