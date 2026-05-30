export type ReviewStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface ReviewDTO {
  id: string;
  userId: string;
  documentId: string;
  rating: number | null;
  score: number | null;
  summary: string;
  feedback: string;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
}
