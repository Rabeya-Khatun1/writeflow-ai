import type { DocumentType } from "@/types";

export const APP_NAME = "WriteFlow AI";

export const FREE_CREDITS = 50;
export const CREDITS_PER_GENERATION = 1;

export const PLAN_LIMITS = {
  FREE: { credits: 50, documents: 10 },
  PRO: { credits: 500, documents: 100 },
  TEAM: { credits: 2000, documents: 500 },
} as const;

export const DOCUMENT_TYPES: {
  value: DocumentType;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "BLOG",
    label: "Blog Post",
    description: "Long-form articles with SEO-friendly structure",
    icon: "FileText",
  },
  {
    value: "EMAIL",
    label: "Email",
    description: "Newsletters, outreach, and transactional copy",
    icon: "Mail",
  },
  {
    value: "SOCIAL",
    label: "Social Media",
    description: "Posts for LinkedIn, X, and Instagram",
    icon: "Share2",
  },
  {
    value: "PRODUCT",
    label: "Product Description",
    description: "E-commerce listings that convert",
    icon: "Package",
  },
  {
    value: "AD_COPY",
    label: "Ad Copy",
    description: "Headlines and short-form ads",
    icon: "Megaphone",
  },
  {
    value: "CUSTOM",
    label: "Custom",
    description: "Free-form writing with your own brief",
    icon: "Sparkles",
  },
];

export const TONE_OPTIONS = [
  "professional",
  "friendly",
  "persuasive",
  "casual",
  "formal",
  "witty",
] as const;

export const PRICING_TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    plan: "FREE" as const,
    features: [
      "50 AI credits / month",
      "10 documents",
      "All content types",
      "Basic templates",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ month",
    plan: "PRO" as const,
    features: [
      "500 AI credits / month",
      "100 documents",
      "Priority generation",
      "Export to Markdown",
      "Email support",
    ],
    cta: "Start Pro trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/ month",
    plan: "TEAM" as const,
    features: [
      "2,000 AI credits / month",
      "500 documents",
      "Shared workspace (soon)",
      "API access (soon)",
      "Priority support",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];
