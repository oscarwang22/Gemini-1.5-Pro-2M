import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

const geminiRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(60, '1 m'),
  analytics: true,
  prefix: 'gemini_ratelimit'
})

function getIP() {
  return headers().get('x-real-ip') ?? 'unknown'
}

export async function rateLimit() {
  // Instead of checking the rate limit, always return success: true
  // This effectively makes the rate limit unlimited
  return { success: true };
}
