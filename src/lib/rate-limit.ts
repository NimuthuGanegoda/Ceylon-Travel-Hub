import { env } from './env';

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// Note: In a real distributed system (like Vercel Edge Network),
// global variables like this 'store' are not shared across all lambda instances.
// For robust rate limiting in production, use Redis (e.g., Upstash) or a dedicated service.
// This in-memory implementation serves as a basic protection for a single instance or container.
const store = new Map<string, RateLimitStore>();

// Clean up expired entries periodically to prevent memory leaks
// We use a loose check to avoid setting interval if not supported in strict edge envs,
// though modern edge runtimes usually support it.
try {
    if (typeof setInterval !== 'undefined') {
        setInterval(() => {
            const now = Date.now();
            for (const [key, value] of store.entries()) {
                if (value.resetTime <= now) {
                    store.delete(key);
                }
            }
        }, 60000);
    }
} catch (e) {
    // Ignore errors in strict environments
}

export function rateLimit(ip: string) {
  const now = Date.now();
  const windowMs = env.RATE_LIMIT_WINDOW_MS;
  const max = env.RATE_LIMIT_MAX;

  const record = store.get(ip);

  if (!record || record.resetTime <= now) {
    store.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: max - 1, reset: now + windowMs };
  }

  if (record.count >= max) {
    return { success: false, remaining: 0, reset: record.resetTime };
  }

  record.count += 1;
  return { success: true, remaining: max - record.count, reset: record.resetTime };
}
