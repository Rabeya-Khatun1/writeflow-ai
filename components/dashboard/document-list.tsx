import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import type { DocumentDTO } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DOCUMENT_TYPES } from "@/lib/constants";
import { formatRelativeDate, truncate } from "@/lib/utils";

export function DocumentList({ documents }: { documents: DocumentDTO[] }) {
  if (documents.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <FileText className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
            No documents yet
          </h3>
          <p className="mt-2 max-w-sm text-sm text-zinc-500">
            Create your first AI-powered document to get started.
          </p>
          <Link href="/documents/new" className="mt-6">
            <Button>
              <Plus className="h-4 w-4" />
              New document
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <ul className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
      {documents.map((doc) => {
        const typeLabel =
          DOCUMENT_TYPES.find((t) => t.value === doc.type)?.label ?? doc.type;
        return (
          <li key={doc.id}>
            <Link
              href={`/documents/${doc.id}`}
              className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-zinc-900 dark:text-zinc-50">
                  {doc.title}
                </p>
                <p className="mt-1 truncate text-sm text-zinc-500">
                  {doc.content
                    ? truncate(doc.content.replace(/\n/g, " "), 80)
                    : "Empty draft"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Badge variant="secondary">{typeLabel}</Badge>
                <span className="text-xs text-zinc-400">
                  {formatRelativeDate(new Date(doc.updatedAt))}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
