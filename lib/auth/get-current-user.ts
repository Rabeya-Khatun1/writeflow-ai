import { getSession } from "@/lib/auth/session";
import { userRepository } from "@/server/repositories/user.repository";
import type { ProfileDTO } from "@/types";

export async function getCurrentProfile(): Promise<ProfileDTO | null> {
  const session = await getSession();
  if (!session?.user?.id) return null;

  return userRepository.findById(session.user.id);
}

export async function getCurrentUserRole(): Promise<"user" | "admin" | null> {
  const session = await getSession();
  return session?.user?.role ?? null;
}
