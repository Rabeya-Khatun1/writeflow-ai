import Link from "next/link";
import { Plus } from "lucide-react";
import { DocumentList } from "@/components/dashboard/document-list";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { Button } from "@/components/ui/button";
import { getCurrentProfile } from "@/lib/auth/get-current-user";
import { documentService } from "@/server/services/document.service";
import { usageLogRepository } from "@/server/repositories/usage-log.repository";

export const metadata = {
  title: "Dashboard | WriteFlow AI",
};

export default async function DashboardPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const [documents, generationsThisMonth] = await Promise.all([
    documentService.list(profile.id),
    usageLogRepository.countGenerationsThisMonth(profile.id),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Welcome back{profile.name ? `, ${profile.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-1 text-zinc-500">
            Manage your AI documents and track usage.
          </p>
        </div>
        <Link href="/documents/new">
          <Button>
            <Plus className="h-4 w-4" />
            New document
          </Button>
        </Link>
      </div>

      <StatsCards
        documentCount={documents.length}
        credits={profile.credits}
        generationsThisMonth={generationsThisMonth}
      />

      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Recent documents
        </h2>
        <DocumentList documents={documents} />
      </section>
    </div>
  );
}
