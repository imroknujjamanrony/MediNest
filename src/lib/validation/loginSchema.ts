import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string().min(2, { message: "ইউজারনেম কমপক্ষে ২ অক্ষরের হতে হবে।" }),
});

export type FormValues = z.infer<typeof loginFormSchema>;
