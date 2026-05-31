// "use server";

// import { redirect } from "next/navigation";

// export async function signUp(
//   _prevState: { error?: string } | undefined,
//   _formData: FormData
// ): Promise<{ error: string }> {
//   return {
//     error:
//       "Registration is disabled. Use a demo account on the login page (user@writeflow.com or admin@writeflow.com, password 123456).",
//   };
// }

// export async function signOut() {
//   redirect("/api/auth/signout?callbackUrl=/login");
// }


"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function signUp(
  prevState: any,
  formData: FormData
) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "All fields required" }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: "User already exists" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: "Account created" }
}