// lib/validation/registerSchema.ts
import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
