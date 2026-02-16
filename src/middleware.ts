import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter (per IP)
// In production, consider using Redis or Vercel KV
const requestCounts = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100 // requests per window

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = requestCounts.get(ip)

  if (!record || now > record.resetTime) {
    // Create new rate limit record
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  record.count++
  if (record.count > RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  return false
}

export function middleware(request: NextRequest) {
  // Apply rate limiting only to /studio routes
  if (request.nextUrl.pathname.startsWith('/studio')) {
    const clientIp = getClientIp(request)

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*'],
}
