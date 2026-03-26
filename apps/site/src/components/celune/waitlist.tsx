'use client';

import { useState } from 'react';
import { posthog } from '@/lib/posthog';
import { SectionLabel } from './grid-frame';

export function CeluneWaitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [isPriority, setIsPriority] = useState(false);
  const [copied, setCopied] = useState(false);

  const REFERRAL_THRESHOLD = 2;

  const refCode =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('ref') : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'bottom_cta', ref: refCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409 && data.referral_code) {
          setReferralCode(data.referral_code);
          setReferralCount(data.referral_count ?? 0);
          setIsPriority(data.priority ?? false);
          setSubmitted(true);
          return;
        }
        setError(data.error || 'Something went wrong.');
        setLoading(false);
        return;
      }
      posthog.capture('waitlist_signup', { location: 'bottom_cta', email, ref: refCode });
      setReferralCode(data.referral_code);
      setReferralCount(data.referral_count ?? 0);
      setIsPriority(data.priority ?? false);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    const shareUrl = `https://celune.ai?ref=${referralCode}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      posthog.capture('referral_link_copied', {
        referral_code: referralCode,
        location: 'bottom_cta',
      });
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const remaining = Math.max(0, REFERRAL_THRESHOLD - referralCount);

  return (
    <section id="signup" className="relative overflow-hidden py-24 md:py-32">
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

          {/* Email input / referral card */}
          <div className="mx-auto mt-10 max-w-md">
            {submitted ? (
              <div className="space-y-4 text-center">
                <p className="text-celune-400 text-sm font-medium">You&apos;re on the list!</p>

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-left">
                  {isPriority ? (
                    <div className="flex items-center gap-2">
                      <span className="bg-celune-500 h-2 w-2 rounded-full" />
                      <p className="text-celune-400 text-sm font-medium">
                        Priority access unlocked — you&apos;ll be first in line.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="mb-1 text-sm font-medium text-white">
                        Share with 2 friends to skip the line
                      </p>
                      <p className="mb-3 text-xs text-white/50">
                        {remaining === 0
                          ? 'You did it! Priority access unlocked.'
                          : `${referralCount}/${REFERRAL_THRESHOLD} referrals — ${remaining} more to go`}
                      </p>
                    </>
                  )}

                  {!isPriority && (
                    <div className="mb-3 flex gap-1.5">
                      {Array.from({ length: REFERRAL_THRESHOLD }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            i < referralCount ? 'bg-celune-500' : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`celune.ai?ref=${referralCode}`}
                      className="flex-1 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-white/70 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="bg-celune-500 hover:bg-celune-400 rounded-lg px-4 py-2 text-xs font-semibold text-black transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
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
                    className="focus:border-celune-500/50 flex-1 rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors outline-none placeholder:text-neutral-600"
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
