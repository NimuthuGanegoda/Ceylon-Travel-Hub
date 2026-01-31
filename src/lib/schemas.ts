import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters").regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces").trim(),
  email: z.string().email("Invalid email address").max(100, "Email must be less than 100 characters").trim().toLowerCase(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters").trim(),
});

export const searchSchema = z.object({
  origin: z.string().min(2, "Origin is required").max(100).trim(),
  destination: z.string().min(2, "Destination is required").max(100).trim(),
});
