import { notFound } from "next/navigation";
import { DocumentEditor } from "@/components/editor/document-editor";
import { getCurrentProfile } from "@/lib/auth/get-current-user";
import { documentService } from "@/server/services/document.service";

export const metadata = {
  title: "Editor | WriteFlow AI",
};

type PageProps = { params: Promise<{ id: string }> };

export default async function DocumentPage({ params }: PageProps) {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const { id } = await params;
  const document = await documentService.get(profile.id, id);
  if (!document) notFound();

  return (
    <div className="flex flex-col">
      <DocumentEditor document={document} />
    </div>
  );
}
