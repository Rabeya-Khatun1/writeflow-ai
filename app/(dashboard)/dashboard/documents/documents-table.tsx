"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DocumentDTO } from "@/types";
import { formatRelativeDate, truncate } from "@/lib/utils";

export default function DocumentsTable({ documents }: { documents: DocumentDTO[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED">("ALL");

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      const matchesQuery = d.title.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "ALL" ? true : d.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [documents, query, statusFilter]);

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
      <div className="mb-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="flex h-10 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              <option value="ALL">All</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <Button className="h-10" onClick={() => { setQuery(""); setStatusFilter("ALL"); }}>
            Reset
          </Button>
        </div>
      </div>

      <div className="space-y-4 sm:hidden">
        {filtered.map((doc) => (
          <article key={doc.id} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100">{truncate(doc.title, 80)}</p>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{truncate(doc.content, 120)}</p>
              </div>
              <time className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">{formatRelativeDate(new Date(doc.createdAt))}</time>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-700">{doc.status}</span>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
            No documents match your search. Try a different query or reset filters.
          </div>
        )}
      </div>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full table-auto">
          <thead className="text-left text-sm text-zinc-500">
            <tr>
              <th className="py-3">Title</th>
              <th className="py-3">Status</th>
              <th className="py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((doc) => (
              <tr key={doc.id} className="border-t border-zinc-100 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                <td className="py-4 align-top">
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">{truncate(doc.title, 80)}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{truncate(doc.content, 120)}</div>
                </td>
                <td className="py-4 align-top text-sm text-zinc-600 dark:text-zinc-400">{doc.status}</td>
                <td className="py-4 align-top text-sm text-zinc-600 dark:text-zinc-400">{formatRelativeDate(new Date(doc.createdAt))}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-center text-sm text-zinc-500">
                  No documents match your search. Try a different query or reset filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
