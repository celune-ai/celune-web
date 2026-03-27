import { NextRequest, NextResponse } from 'next/server';
import { sendReferralInvite } from '@/lib/email';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const MAX_REFERRALS = 5;

// Rate limit: 3 referral batches per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
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

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  const body = await request.json();
  const referralCode = typeof body.referral_code === 'string' ? body.referral_code.trim() : '';
  const emails: string[] = Array.isArray(body.emails)
    ? body.emails
        .filter((e: unknown) => typeof e === 'string')
        .map((e: string) => e.trim().toLowerCase())
        .filter((e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
    : [];

  if (!referralCode) {
    return NextResponse.json({ error: 'Invalid referral code.' }, { status: 400 });
  }
  if (emails.length === 0) {
    return NextResponse.json({ error: 'Please enter at least one valid email.' }, { status: 400 });
  }
  if (emails.length > 5) {
    return NextResponse.json({ error: 'Maximum 5 invites at a time.' }, { status: 400 });
  }

  const headers = {
    apikey: SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };

  // Look up the referrer by their referral_code
  const referrerRes = await fetch(
    `${SUPABASE_URL}/rest/v1/waitlist?referral_code=eq.${encodeURIComponent(referralCode)}&select=id,email,referral_count`,
    { headers },
  );
  const referrers = await referrerRes.json();
  if (!Array.isArray(referrers) || referrers.length === 0) {
    return NextResponse.json({ error: 'Invalid referral code.' }, { status: 400 });
  }

  const referrer = referrers[0];
  const remainingSlots = MAX_REFERRALS - (referrer.referral_count ?? 0);
  if (remainingSlots <= 0) {
    return NextResponse.json(
      { error: `You've used all ${MAX_REFERRALS} referral invites.` },
      { status: 400 },
    );
  }

  const toSend = emails.slice(0, remainingSlots);
  const results: { email: string; status: 'sent' | 'exists' | 'error' }[] = [];

  for (const email of toSend) {
    // Don't let people refer themselves
    if (email === referrer.email) {
      results.push({ email, status: 'error' });
      continue;
    }

    // Check if email already exists in waitlist
    const existsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/waitlist?email=eq.${encodeURIComponent(email)}&select=id`,
      { headers },
    );
    const existing = await existsRes.json();
    if (Array.isArray(existing) && existing.length > 0) {
      results.push({ email, status: 'exists' });
      continue;
    }

    // Insert referred entry
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        source: 'referral',
        status: 'referred',
        referred_by: referrer.id,
        referral_code: crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase(),
      }),
    });

    if (!insertRes.ok) {
      results.push({ email, status: 'error' });
      continue;
    }

    // Send referral email (fire-and-forget)
    sendReferralInvite(email, referrer.email).catch(() => {});
    results.push({ email, status: 'sent' });
  }

  // Update referrer's referral_count
  const sentCount = results.filter((r) => r.status === 'sent').length;
  if (sentCount > 0) {
    await fetch(`${SUPABASE_URL}/rest/v1/waitlist?id=eq.${referrer.id}`, {
      method: 'PATCH',
      headers: { ...headers, Prefer: 'return=minimal' },
      body: JSON.stringify({
        referral_count: (referrer.referral_count ?? 0) + sentCount,
      }),
    });
  }

  return NextResponse.json({
    success: true,
    results,
    remaining: remainingSlots - sentCount,
  });
}
