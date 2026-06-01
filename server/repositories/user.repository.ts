import type { Plan, UserDTO } from "@/types";
import { FREE_CREDITS } from "@/lib/constants";
import { prisma } from "@/lib/db/prisma";

function toDTO(user: {
  id: string;
  email: string | null;
  name: string | null;
  plan: Plan;
  credits: number;
}): UserDTO {
  return {
    id: user.id,
    email: user.email ?? "",
    name: user.name,
    plan: user.plan,
    credits: user.credits,
  };
}

export const userRepository = {
  async findById(id: string): Promise<UserDTO | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? toDTO(user) : null;
  },

  async upsertFromAuth(params: {
    id: string;
    email: string;
    name?: string | null;
  }): Promise<UserDTO> {
    const user = await prisma.user.upsert({
      where: { id: params.id },
      create: {
        id: params.id,
        email: params.email,
        name: params.name ?? null,
        credits: FREE_CREDITS,
      },
      update: {
        email: params.email,
        ...(params.name !== undefined ? { name: params.name } : {}),
      },
    });
    return toDTO(user);
  },

  async upsertDemoUser(params: {
    id: string;
    email: string;
    name: string;
    plan: Plan;
    credits: number;
  }): Promise<UserDTO> {
    const user = await prisma.user.upsert({
      where: { id: params.id },
      create: {
        id: params.id,
        email: params.email,
        name: params.name,
        plan: params.plan,
        credits: params.credits,
      },
      update: {
        email: params.email,
        name: params.name,
        plan: params.plan,
      },
    });
    return toDTO(user);
  },

  async deductCredits(id: string, amount: number): Promise<UserDTO | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user || user.credits < amount) return null;

    const updated = await prisma.user.update({
      where: { id },
      data: { credits: { decrement: amount } },
    });
    return toDTO(updated);
  },
};

/** @deprecated Use userRepository */
export const profileRepository = userRepository;
