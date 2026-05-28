import { z } from "zod";

export const registerTouristSchema = z
  .object({
    email: z.string().trim().email("Email must be a valid email address").toLowerCase(),
    phone: z.string().trim().min(7, "Phone number must be at least 7 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.string().trim().email("Email must be a valid email address").toLowerCase(),
    password: z.string().min(1, "Password is required"),
  })
  .strict();

export type RegisterTouristDto = z.infer<typeof registerTouristSchema>;
export type LoginDto = z.infer<typeof loginSchema>;

export interface AuthUser {
  id: string;
  email: string;
  phone: string;
  walletAddress: string;
}

export interface AuthTokenPayload {
  userId: string;
  walletAddress: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
