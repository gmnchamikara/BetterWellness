// schemas/signupSchema.ts
import { z } from "zod";

export const signupSchema = z.object({
  fname: z.string().min(2, "First name is required"),
  lname: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
