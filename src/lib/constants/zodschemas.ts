import { z } from "zod";

export const contactFormSchema = z.object({
    fullname: z.string().min(2, "Your name must be at least 2 charecters").max(255, "Your name cannot exceed 255 charecters"),
    email: z.string().email("Please enter a valid email"),
    message: z.string().min(2, "Your message must be more than 2 charecters")
})

export const newsletterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 charecters long"),
    email: z.string().email("Please enter a valid email address")
  })