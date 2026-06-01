// import { prisma } from "@/lib/db/prisma";
// import bcrypt from "bcryptjs";

// export async function signUp(prevState: any, formData: FormData) {
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   const existing = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (existing) {
//     return { error: "User already exists" };
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });

//   return { success: "Account created successfully" };
// }


import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return NextResponse.json({ error: "User exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return NextResponse.json({ success: true });
}