import { z } from "zod";

export const registerSchema = z.object({
    email: z.email(),
    name: z.string().optional(),
    password: z.string().min(6),
});

export const signinSchema = z.object({
    email: z.email(),
    name: z.string().optional(),
    password: z.string().min(6),
})

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  imageURL: z.string().optional()
});