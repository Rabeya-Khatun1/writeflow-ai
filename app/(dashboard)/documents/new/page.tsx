import { NewDocumentForm } from "@/components/documents/new-document-form";

export const metadata = {
  title: "New document | WriteFlow AI",
};

export default function NewDocumentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Create a document
        </h1>
        <p className="mt-1 text-zinc-500">
          Choose a content type and open the AI editor.
        </p>
      </div>
      <NewDocumentForm />
    </div>
  );
}
