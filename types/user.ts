export type Plan = "FREE" | "PRO" | "TEAM";

export interface UserDTO {
  id: string;
  email: string;
  name: string | null;
  plan: Plan;
  credits: number;
}

/** @deprecated Use UserDTO */
export type ProfileDTO = UserDTO;
