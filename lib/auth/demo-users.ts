import type { Plan } from "@/types";

export type DemoUserRole = "user" | "admin";

export interface DemoUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: DemoUserRole;
  plan: Plan;
  credits: number;
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    email: "user@writeflow.com",
    password: "123456",
    name: "Demo User",
    role: "user",
    plan: "FREE",
    credits: 50,
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    email: "admin@writeflow.com",
    password: "123456",
    name: "Admin User",
    role: "admin",
    plan: "PRO",
    credits: 500,
  },
];

export function findDemoUser(email: string, password: string): DemoUser | undefined {
  return DEMO_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
}
