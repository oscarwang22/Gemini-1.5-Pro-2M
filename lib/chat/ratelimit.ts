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
  // Always return success: true to effectively disable rate limiting
  return { success: true };
}
