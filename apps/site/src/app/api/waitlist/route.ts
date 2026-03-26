import { NextRequest, NextResponse } from 'next/server';
import { sendWaitlistWelcome, forwardToAgentmail } from '@/lib/email';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const REFERRAL_THRESHOLD = 2; // 2 referrals to skip the line

// Simple in-memory rate limiter: max 5 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

/** Generate a short, URL-safe referral code */
function generateReferralCode(): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789'; // no ambiguous chars
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(request: NextRequest) {
  // Service client: waitlist insert bypasses RLS. Accesses: waitlist.
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  // Rate limit by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  const body = await request.json();
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const referredBy = typeof body.ref === 'string' ? body.ref.trim() : null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const referralCode = generateReferralCode();

  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      email,
      source: body.source || 'landing',
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      utm_content: body.utm_content || null,
      referrer: body.referrer || null,
      referral_code: referralCode,
      referred_by: referredBy,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    if (text.includes('duplicate') || text.includes('unique')) {
      // Already on the list — look up their existing referral code
      const lookupRes = await fetch(
        `${SUPABASE_URL}/rest/v1/waitlist?email=eq.${encodeURIComponent(email)}&select=referral_code,referral_count,priority`,
        {
          headers: {
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          },
        },
      );
      if (lookupRes.ok) {
        const rows = await lookupRes.json();
        if (rows.length > 0) {
          return NextResponse.json(
            {
              error: "You're already on the list!",
              referral_code: rows[0].referral_code,
              referral_count: rows[0].referral_count,
              priority: rows[0].priority,
              referral_threshold: REFERRAL_THRESHOLD,
            },
            { status: 409 },
          );
        }
      }
      return NextResponse.json({ error: "You're already on the list!" }, { status: 409 });
    }
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  // If referred by someone, increment their referral count
  if (referredBy) {
    // Look up referrer and increment
    const countRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_referral_count`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_referral_code: referredBy,
        p_threshold: REFERRAL_THRESHOLD,
      }),
    }).catch(() => null);

    // Non-fatal — don't block signup if referral tracking fails
    if (countRes && !countRes.ok) {
      console.warn('[waitlist] Failed to increment referral count for:', referredBy);
    }
  }

  // Send welcome email + forward to agentmail inbox (fire-and-forget)
  sendWaitlistWelcome(email).catch(() => {});
  forwardToAgentmail(email, body.source || 'landing').catch(() => {});

  return NextResponse.json({
    success: true,
    referral_code: referralCode,
    referral_count: 0,
    priority: false,
    referral_threshold: REFERRAL_THRESHOLD,
  });
}
