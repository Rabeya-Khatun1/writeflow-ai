import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/auth/get-current-user";
import { updateDocumentSchema } from "@/lib/validations/document";
import { documentService } from "@/server/services/document.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const profile = await getCurrentProfile();
  if (!profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const document = await documentService.get(profile.id, id);
  if (!document) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(document);
}

export async function PATCH(request: Request, context: RouteContext) {
  const profile = await getCurrentProfile();
  if (!profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const parsed = updateDocumentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const document = await documentService.update(profile.id, id, parsed.data);
  if (!document) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(document);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const profile = await getCurrentProfile();
  if (!profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await documentService.remove(profile.id, id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
