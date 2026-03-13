'use client';

import { useState } from 'react';
import { posthog } from '@/lib/posthog';
import { SectionLabel } from './grid-frame';

export function CeluneWaitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'bottom_cta' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setLoading(false);
        return;
      }
      posthog.capture('waitlist_signup', { location: 'bottom_cta', email });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="signup" className="relative py-24 md:py-32 overflow-hidden">
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

          {/* Email input */}
          <div className="mx-auto mt-10 max-w-md">
            {submitted ? (
              <p className="text-center text-sm text-celune-400">
                Thanks! We&apos;ll be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-celune-500/50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-celune-500 hover:bg-celune-400 cursor-pointer rounded-lg px-6 py-3 text-sm font-semibold text-black transition-colors whitespace-nowrap disabled:opacity-50"
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
