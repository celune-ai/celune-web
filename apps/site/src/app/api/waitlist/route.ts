import { NextRequest, NextResponse } from 'next/server';
import { sendWaitlistWelcome, forwardToAgentmail } from '@/lib/email';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const supabaseHeaders = {
    apikey: SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };

  // Check if this email was pre-registered as a referral (status='referred')
  const refParam = typeof body.ref === 'string' ? body.ref.trim() : '';
  const existingRes = await fetch(
    `${SUPABASE_URL}/rest/v1/waitlist?email=eq.${encodeURIComponent(email)}&status=eq.referred&select=id`,
    { headers: supabaseHeaders },
  );
  const existingReferred = await existingRes.json();

  let res: Response;

  if (Array.isArray(existingReferred) && existingReferred.length > 0) {
    // Upgrade referred entry to pending (they actually signed up)
    res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist?id=eq.${existingReferred[0].id}`, {
      method: 'PATCH',
      headers: { ...supabaseHeaders, Prefer: 'return=representation' },
      body: JSON.stringify({
        status: 'pending',
        source: body.source || 'referral',
        priority: true,
      }),
    });
  } else {
    // Fresh signup — check if they were referred via URL param
    let referred_by: string | null = null;
    if (refParam) {
      const referrerLookup = await fetch(
        `${SUPABASE_URL}/rest/v1/waitlist?email=eq.${encodeURIComponent(refParam)}&select=id`,
        { headers: supabaseHeaders },
      );
      const referrers = await referrerLookup.json();
      if (Array.isArray(referrers) && referrers.length > 0) {
        referred_by = referrers[0].id;
      }
    }

    res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: supabaseHeaders,
      body: JSON.stringify({
        email,
        source: referred_by ? 'referral' : body.source || 'landing',
        utm_source: body.utm_source || null,
        utm_medium: body.utm_medium || null,
        utm_campaign: body.utm_campaign || null,
        utm_content: body.utm_content || null,
        referrer: body.referrer || null,
        referred_by,
        priority: !!referred_by,
        referral_code: crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase(),
      }),
    });
  }

  if (!res.ok) {
    const text = await res.text();
    if (text.includes('duplicate') || text.includes('unique')) {
      return NextResponse.json({ error: "You're already on the list!" }, { status: 409 });
    }
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  // Extract referral code from response for the welcome email
  let referralCode: string | undefined;
  try {
    const data = await res.json();
    if (Array.isArray(data) && data[0]?.referral_code) {
      referralCode = data[0].referral_code;
    }
  } catch {
    // Response body already consumed or missing
  }

  // Send welcome email + forward to agentmail inbox (fire-and-forget)
  sendWaitlistWelcome(email, referralCode).catch((err) => {
    console.error('[waitlist] Welcome email failed:', err);
  });
  forwardToAgentmail(email, body.source || 'landing').catch((err) => {
    console.error('[waitlist] Agentmail forward failed:', err);
  });

  return NextResponse.json({ success: true, referral_code: referralCode });
}
