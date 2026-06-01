"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const toneOptions = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "persuasive", label: "Persuasive" },
];

type GenerateResult = {
  title: string;
  content: string;
  tags: string[];
  metaDescription: string;
};

interface GenerateFormProps {
  initialPrompt?: string;
  initialTopic?: string;
  initialTone?: string;
  initialAudience?: string;
}

export default function GenerateForm({
  initialPrompt = "",
  initialTopic = "",
  initialTone = "formal",
  initialAudience = "",
}: GenerateFormProps) {
  const [topic, setTopic] = useState(initialTopic);
  const [templatePrompt, setTemplatePrompt] = useState(initialPrompt);
  const [tone, setTone] = useState(initialTone);
  const [audience, setAudience] = useState(initialAudience);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [editableContent, setEditableContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!templatePrompt.trim() && (!topic.trim() || !audience.trim())) {
      setError("Please enter a topic and audience, or use a template.");
      return;
    }

    setIsLoading(true);

    try {
      const payload: Record<string, string> = {
        tone,
      };

      if (templatePrompt.trim()) {
        payload.prompt = templatePrompt.trim();
      } else {
        payload.topic = topic.trim();
        payload.audience = audience.trim();
      }

      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body?.error || "Unable to generate content.");
      }

      setResult(body);
      setEditableContent(body.content ?? "");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (result) setEditableContent(result.content ?? "");
  }, [result]);

  useEffect(() => {
    setTemplatePrompt(initialPrompt);
    setTopic(initialTopic);
    setTone(initialTone);
    setAudience(initialAudience);
  }, [initialPrompt, initialTopic, initialTone, initialAudience]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none sm:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="e.g. Launching a new productivity tool"
              />
            </div>

            <div>
              <Label htmlFor="tone">Tone</Label>
              <select
                id="tone"
                value={tone}
                onChange={(event) => setTone(event.target.value)}
                className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              >
                {toneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="audience">Audience</Label>
              <Input
                id="audience"
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                placeholder="e.g. small business owners"
              />
            </div>
          </div>

          <div className="space-y-4">
            {templatePrompt ? (
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-200">
                <p className="font-medium">Template selected</p>
                <p className="mt-1">The template prompt is pre-loaded and will be used for generation.</p>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Generate clean content with structured output for title, tags, and metadata.
              </p>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200" role="alert">
              {error}
            </div>
          ) : null}
        </form>
      </div>

      <div className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none sm:p-8">
        <div className="space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Preview</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Generated content will show here after you submit the form.
              </p>
            </div>
            {saveMessage ? (
              <div className={`rounded-2xl border px-4 py-2 text-sm ${saveStatus === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200" : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200"}`}>
                {saveMessage}
              </div>
            ) : null}
          </div>
        </div>

        {isLoading && !result ? (
          <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
            Generating content. This usually takes a few seconds.
          </div>
        ) : result ? (
          <div className="space-y-5">
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{result.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{result.metaDescription}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(editableContent || "");
                        setSaveMessage("Copied to clipboard.");
                        setSaveStatus("success");
                      } catch (e) {
                        setError("Unable to copy to clipboard.");
                        setSaveStatus("error");
                      }
                    }}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    disabled={saveStatus === "saving"}
                    onClick={async () => {
                      if (!result) return;
                      setSaveStatus("saving");
                      setSaveMessage(null);
                      setError(null);

                      try {
                        const res = await fetch("/api/documents/create", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            title: result.title ?? "Untitled",
                            content: editableContent,
                            type: "CUSTOM",
                            tone,
                          }),
                        });

                        const body = await res.json();
                        if (!res.ok) {
                          throw new Error(body?.error || "Failed to save document.");
                        }

                        setSaveStatus("success");
                        setSaveMessage("Document saved successfully.");
                      } catch (err) {
                        setSaveStatus("error");
                        setSaveMessage((err as Error).message || "Unable to save document.");
                      }
                    }}
                  >
                    {saveStatus === "saving" ? "Saving..." : "Save Document"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {result.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <Textarea
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                className="min-h-40"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
            Fill in the inputs and click Generate to preview your content here.
          </div>
        )}
      </div>
    </div>
  );
}
