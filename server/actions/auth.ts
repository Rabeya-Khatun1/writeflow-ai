"use server";

import { redirect } from "next/navigation";

export async function signUp(
  _prevState: { error?: string } | undefined,
  _formData: FormData
): Promise<{ error: string }> {
  return {
    error:
      "Registration is disabled. Use a demo account on the login page (user@writeflow.com or admin@writeflow.com, password 123456).",
  };
}

export async function signOut() {
  redirect("/api/auth/signout?callbackUrl=/login");
}
