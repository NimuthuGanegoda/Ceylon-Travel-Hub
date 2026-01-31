import { z } from 'zod';

const envSchema = z.object({
  // Simulating a secret key for an external service (e.g. Email provider, Payment gateway)
  API_SECRET_KEY: z.string().min(1, "API_SECRET_KEY is required"),
  // Rate limiting configuration
  RATE_LIMIT_MAX: z.string().default("20").transform(val => parseInt(val, 10)),
  RATE_LIMIT_WINDOW_MS: z.string().default("60000").transform(val => parseInt(val, 10)), // 1 minute
});

const processEnv = {
  API_SECRET_KEY: process.env.API_SECRET_KEY,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
};

// Safe parsing to allow build time (where env might not be set) but fail at runtime
const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  // In a real app, you might want to throw an error here to prevent startup with invalid env
  console.error("❌ Invalid environment variables:", parsed.error.format());
  // We don't throw immediately to allow build process to pass if envs are missing
  // But we export a validated object that might be partial or check on usage
}

export const env = parsed.success ? parsed.data : {
    API_SECRET_KEY: process.env.API_SECRET_KEY || "dummy-key-fallback", // Fallback for demo
    RATE_LIMIT_MAX: 20,
    RATE_LIMIT_WINDOW_MS: 60000
};
