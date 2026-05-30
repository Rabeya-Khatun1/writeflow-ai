# WriteFlow AI — Folder Structure

Scalable SaaS layout. Keep routes thin; put business logic in `server/` and shared code in `lib/`.

```
writeflow-ai/
├── app/                      # Next.js App Router (routes only)
│   ├── (auth)/               # login, signup
│   ├── (dashboard)/          # dashboard, documents, settings
│   ├── api/                  # REST route handlers
│   ├── layout.tsx
│   └── page.tsx              # marketing landing
│
├── components/               # React UI
│   ├── ui/                   # shadcn primitives
│   ├── layout/               # shell, nav, logo
│   ├── marketing/            # landing sections
│   ├── dashboard/            # dashboard widgets
│   ├── auth/                 # auth forms
│   ├── editor/               # document editor
│   └── documents/            # document flows
│
├── hooks/                    # Client React hooks
│   ├── use-mounted.ts
│   ├── use-user.ts
│   └── index.ts
│
├── lib/                      # Shared utilities & adapters
│   ├── auth/                 # getCurrentProfile, etc.
│   ├── db/                   # Prisma singleton
│   ├── supabase/             # browser, server, middleware clients
│   ├── openai/               # OpenAI client
│   ├── validations/          # Zod schemas
│   ├── constants.ts
│   └── utils.ts
│
├── server/                   # Server-only business logic
│   ├── actions/              # Server Actions ("use server")
│   ├── repositories/         # Data access (Prisma)
│   └── services/             # Use cases / domain services
│
├── types/                    # Shared TypeScript types & DTOs
│   ├── document.ts
│   ├── user.ts
│   ├── ai.ts
│   └── index.ts
│
├── prisma/                   # Schema & migrations
│   └── schema.prisma
│
└── middleware.ts             # Auth session (imports lib/supabase)
```

## Import conventions

| Import | Use for |
|--------|---------|
| `@/types` | DTOs, enums, API contracts |
| `@/lib/*` | Utils, clients, validations |
| `@/server/*` | Services, repositories, server actions |
| `@/components/*` | UI components |
| `@/hooks/*` | Client hooks |

## Adding features

1. Define types in `types/`
2. Add Zod schemas in `lib/validations/`
3. Add repository + service in `server/`
4. Expose via `app/api/` or `server/actions/`
5. Build UI in `components/` + route in `app/`
