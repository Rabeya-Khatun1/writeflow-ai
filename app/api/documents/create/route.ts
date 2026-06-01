import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/auth/get-current-user";
import { createDocumentSchema } from "@/lib/validations/document";
import { documentService, DocumentLimitError } from "@/server/services/document.service";

export async function POST(request: Request) {
  const profile = await getCurrentProfile();
  if (!profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = createDocumentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const document = await documentService.create(profile.id, parsed.data);
    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    if (error instanceof DocumentLimitError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("[POST /api/documents/create]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
