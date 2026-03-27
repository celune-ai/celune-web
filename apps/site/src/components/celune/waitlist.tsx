'use client';

import { useState } from 'react';
import { posthog } from '@/lib/posthog';
import { useWaitlist } from '@/lib/waitlist-context';
import { SectionLabel } from './grid-frame';

export function CeluneWaitlist() {
  const waitlist = useWaitlist();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setError('');
    setLoading(true);

    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref') || undefined;

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: ref ? 'referral' : 'bottom_cta', ref }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setLoading(false);
        return;
      }
      posthog.capture('waitlist_signup', { location: 'bottom_cta', email });
      if (data.referral_code) waitlist.setReferralCode(data.referral_code);
      waitlist.setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="signup" className="relative overflow-hidden py-12 md:py-32">
      {/* Top fade into page bg */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[#08080A] to-transparent" />

      <div className="relative z-10 container">
        <div>
          {/* Heading block */}
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Get started</SectionLabel>
            <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
              Early access is free for a limited time
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              We&apos;re onboarding select teams now. Request early access below.
            </p>
          </div>

          {/* Email input — matches hero exactly */}
          <div className="mx-auto mt-10 max-w-md">
            {waitlist.submitted ? (
              <div className="flex flex-col items-center gap-3">
                <div className="border-celune-500/20 bg-celune-500/10 inline-flex items-center gap-2.5 rounded-lg border px-4 py-3">
                  <svg
                    className="text-celune-400 h-4 w-4 flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8.5L6.5 12L13 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-celune-400 text-sm font-medium">
                    Welcome! Access code incoming. Refer a friend for priority access.
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="focus:border-celune-500/50 flex-1 rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors outline-none placeholder:text-white/60"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-celune-500 hover:bg-celune-400 cursor-pointer rounded-lg px-6 py-3 text-sm font-semibold whitespace-nowrap text-black transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Get Early Access'}
                  </button>
                </div>
                {error && <p className="text-center text-xs text-red-400">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
