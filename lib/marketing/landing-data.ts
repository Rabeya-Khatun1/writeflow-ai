export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
] as const;

export const LANDING_FEATURES = [
  {
    title: "AI drafts in seconds",
    description:
      "Generate blogs, emails, ads, and social posts from a single prompt with GPT-4o-mini tuned for marketing copy.",
    icon: "Zap",
  },
  {
    title: "Templates that convert",
    description:
      "Start from proven system templates or save your own. Control tone, format, and structure every time.",
    icon: "Layers",
  },
  {
    title: "Built-in editor",
    description:
      "Edit, save, and organize documents in one workspace. Track word count and version history as you iterate.",
    icon: "FileText",
  },
  {
    title: "Usage & credits",
    description:
      "Transparent credit tracking per generation. Scale from free tier to team plans without surprise bills.",
    icon: "BarChart3",
  },
  {
    title: "Content reviews",
    description:
      "Run AI reviews on drafts for clarity, tone, and quality scores before you publish.",
    icon: "MessageSquare",
  },
  {
    title: "Production-ready stack",
    description:
      "Next.js, Prisma, and OpenAI under the hood — secure auth, typed APIs, and a stack you can ship today.",
    icon: "Shield",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "WriteFlow cut our blog production time in half. The templates alone saved our content team hours every week.",
    name: "Sarah Chen",
    role: "Head of Content",
    company: "Northline",
    initials: "SC",
  },
  {
    quote:
      "We ship LinkedIn posts and newsletters from one tool now. Tone control means our brand voice stays consistent.",
    name: "Marcus Webb",
    role: "Marketing Lead",
    company: "Stackform",
    initials: "MW",
  },
  {
    quote:
      "The credit system is honest — we know exactly what each draft costs. Perfect for a growing SaaS team.",
    name: "Elena Rodriguez",
    role: "Founder",
    company: "Draftly",
    initials: "ER",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is WriteFlow AI?",
    answer:
      "WriteFlow AI is an AI writing workspace for teams and creators. Generate and edit blogs, emails, social posts, product descriptions, and ad copy with templates, tone control, and a document editor.",
  },
  {
    question: "How do credits work?",
    answer:
      "Each AI generation uses one credit by default. Free accounts start with 50 credits. Pro and Team plans include 500 and 2,000 credits per month respectively. Credits reset monthly on paid plans.",
  },
  {
    question: "Can I try it for free?",
    answer:
      "Yes. Sign up with a demo account or create a free account to get 50 credits, 10 documents, and access to all content types and system templates.",
  },
  {
    question: "What AI model do you use?",
    answer:
      "We use OpenAI GPT-4o-mini for fast, cost-effective generation optimized for marketing and long-form content. Model details are logged in your usage history.",
  },
  {
    question: "Is my content private?",
    answer:
      "Your documents are stored in your workspace and tied to your account. We do not use your content to train models. See our privacy policy for full details.",
  },
  {
    question: "Can I upgrade or cancel anytime?",
    answer:
      "Paid plans can be upgraded or downgraded from settings. Billing is monthly with no long-term contracts. Contact us for Team and enterprise options.",
  },
] as const;

export const FOOTER_LINKS = {
  product: [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "/login", label: "Log in" },
    { href: "/signup", label: "Sign up" },
  ],
  company: [
    { href: "#", label: "About" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Contact" },
  ],
  legal: [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
    { href: "#", label: "Security" },
  ],
} as const;
