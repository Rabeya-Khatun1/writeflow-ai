"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles, Save, Trash2 } from "lucide-react";
import type { DocumentDTO, DocumentType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DOCUMENT_TYPES, TONE_OPTIONS } from "@/lib/constants";
import { countWords } from "@/lib/utils";

interface DocumentEditorProps {
  document: DocumentDTO;
}

export function DocumentEditor({ document: initial }: DocumentEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [content, setContent] = useState(initial.content);
  const [type, setType] = useState<DocumentType>(initial.type);
  const [tone, setTone] = useState(initial.tone);
  const [prompt, setPrompt] = useState("");
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/documents/${initial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, type, tone }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save");
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleGenerate() {
    if (prompt.trim().length < 10) {
      setError("Describe what you want in at least 10 characters.");
      return;
    }
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          type,
          tone,
          documentId: initial.id,
          title,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      setContent(data.content);
      if (data.creditsRemaining !== undefined) {
        setCredits(data.creditsRemaining);
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this document? This cannot be undone.")) return;
    const res = await fetch(`/api/documents/${initial.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Content type</Label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as DocumentType)}
                className="flex h-10 rounded-lg border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              >
                {DOCUMENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="flex h-10 rounded-lg border border-zinc-200 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              >
                {TONE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save
          </Button>
          <Button variant="ghost" onClick={handleDelete} className="text-red-600">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4 dark:border-violet-900 dark:bg-violet-950/20">
        <Label htmlFor="prompt" className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
          <Sparkles className="h-4 w-4" />
          AI prompt
          {credits !== null && (
            <span className="ml-auto text-xs font-normal text-zinc-500">
              {credits} credits left
            </span>
          )}
        </Label>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to write. E.g. 'A blog post about remote work productivity tips for startup founders'"
          className="mt-2 border-violet-200 bg-white dark:border-violet-800 dark:bg-zinc-950"
          rows={3}
        />
        <Button
          className="mt-3"
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate with AI
            </>
          )}
        </Button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/50">
          {error}
        </p>
      )}

      <div className="flex min-h-0 flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Content</Label>
          <span className="text-xs text-zinc-500">{countWords(content)} words</span>
        </div>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[400px] flex-1 font-mono text-sm leading-relaxed"
          placeholder="Your content will appear here after generation, or start typing…"
        />
      </div>
    </div>
  );
}
