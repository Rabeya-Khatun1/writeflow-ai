import { getCurrentProfile } from "@/lib/auth/get-current-user";
import { documentService } from "@/server/services/document.service";
import DocumentsTable from "./documents-table";

export const metadata = {
  title: "Documents | Dashboard | WriteFlow AI",
};

export default async function DocumentsPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const documents = await documentService.list(profile.id);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Your documents</h1>
            <p className="mt-1 text-sm text-zinc-500">Manage and search your generated documents.</p>
          </div>
        </div>
      </div>

      <DocumentsTable documents={documents} />
    </div>
  );
}
