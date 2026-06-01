// // import type { NextAuthOptions } from "next-auth";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import { findDemoUser } from "@/lib/auth/demo-users";
// // import { userRepository } from "@/server/repositories/user.repository";

// // export const authOptions: NextAuthOptions = {
// //   providers: [
// //     CredentialsProvider({
// //       id: "credentials",
// //       name: "Credentials",
// //       credentials: {
// //         email: { label: "Email", type: "email" },
// //         password: { label: "Password", type: "password" },
// //       },
// //       async authorize(credentials) {
// //         if (!credentials?.email || !credentials?.password) {
// //           return null;
// //         }

// //         const demo = findDemoUser(credentials.email, credentials.password);
// //         if (!demo) {
// //           return null;
// //         }

// //         await userRepository.upsertDemoUser({
// //           id: demo.id,
// //           email: demo.email,
// //           name: demo.name,
// //           plan: demo.plan,
// //           credits: demo.credits,
// //         });

// //         return {
// //           id: demo.id,
// //           email: demo.email,
// //           name: demo.name,
// //           role: demo.role,
// //         };
// //       },
// //     }),
// //   ],
// //   session: {
// //     strategy: "jwt",
// //     maxAge: 30 * 24 * 60 * 60,
// //   },
// //   pages: {
// //     signIn: "/login",
// //   },
// //   callbacks: {
// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.id = user.id;
// //         token.role = user.role;
// //       }
// //       return token;
// //     },
// //     async session({ session, token }) {
// //       if (session.user) {
// //         session.user.id = token.id as string;
// //         session.user.role = token.role as "user" | "admin";
// //       }
// //       return session;
// //     },
// //   },
// //   secret: process.env.NEXTAUTH_SECRET,
// // };


// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import bcrypt from "bcryptjs"
// import { prisma } from "../db/prisma"

// const handler = NextAuth({
//   adapter: PrismaAdapter(prisma),

//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     CredentialsProvider({
//       name: "credentials",

//       credentials: {
//         email: {},
//         password: {},
//       },

//       async authorize(credentials) {
//         const email = credentials?.email as string
//         const password = credentials?.password as string

//         if (!email || !password) return null

//         const user = await prisma.user.findUnique({
//           where: { email },
//         })

//         if (!user || !user?.password) return null

//         const isValid = await bcrypt.compare(password, user?.password)

//         if (!isValid) return null

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//         }
//       },
//     }),
//   ],
// })

// export { handler as GET, handler as POST }



import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "../db/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials?.email as string
        const password = credentials?.password as string

        if (!email || !password) return null

        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: "user" as const,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: "user" | "admin" }).role ?? "user"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "user" | "admin"
      }
      return session
    },
  },
}