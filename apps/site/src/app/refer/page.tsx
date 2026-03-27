'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ReferForm() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') ?? '';

  const [emails, setEmails] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<
    { email: string; status: 'sent' | 'exists' | 'error' }[] | null
  >(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  function addEmail() {
    if (emails.length < 5) setEmails([...emails, '']);
  }

  function removeEmail(index: number) {
    setEmails(emails.filter((_, i) => i !== index));
  }

  function updateEmail(index: number, value: string) {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validEmails = emails
      .map((e) => e.trim().toLowerCase())
      .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

    if (validEmails.length === 0) {
      setError('Please enter at least one valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const res = await fetch('/api/refer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referral_code: code, emails: validEmails }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setLoading(false);
        return;
      }
      setResults(data.results);
      setRemaining(data.remaining);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!code) {
    return (
      <div className="text-center">
        <h1 className="font-heading text-3xl font-medium text-white">Invalid Referral Link</h1>
        <p className="mt-4 text-white/60">
          This link is missing a referral code. Please use the link from your waitlist confirmation
          email.
        </p>
        <a
          href="https://celune.ai"
          className="mt-6 inline-block rounded-lg bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          Go to celune.ai
        </a>
      </div>
    );
  }

  if (results) {
    const sent = results.filter((r) => r.status === 'sent');
    const existed = results.filter((r) => r.status === 'exists');

    return (
      <div className="w-full max-w-md text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
          <svg className="h-8 w-8 text-green-400" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="font-heading text-2xl font-medium text-white">
          {sent.length > 0 ? 'Invites Sent!' : 'No New Invites'}
        </h1>
        {sent.length > 0 && (
          <div className="mt-4 space-y-2">
            {sent.map((r) => (
              <div
                key={r.email}
                className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-2 text-sm text-green-400"
              >
                <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8.5L6.5 12L13 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {r.email}
              </div>
            ))}
          </div>
        )}
        {existed.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {existed.map((r) => (
              <p key={r.email} className="text-xs text-white/40">
                {r.email} is already on the waitlist
              </p>
            ))}
          </div>
        )}
        {remaining !== null && remaining > 0 && (
          <p className="mt-4 text-sm text-white/50">
            You have {remaining} invite{remaining !== 1 ? 's' : ''} remaining.
          </p>
        )}
        <button
          onClick={() => {
            setResults(null);
            setEmails(['']);
          }}
          className="mt-6 inline-block rounded-lg bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          Send More Invites
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <img src="/celune_light.png" alt="Celune" className="mx-auto mb-6 h-10" />
        <h1 className="font-heading text-3xl font-medium text-white">Invite Your Friends</h1>
        <p className="mt-3 text-white/60">
          Share early access to Celune with up to 5 friends. They'll get priority placement on the
          waitlist.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {emails.map((email, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => updateEmail(i, e.target.value)}
              placeholder="friend@company.com"
              className="flex-1 rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors outline-none placeholder:text-white/40 focus:border-green-500/50"
            />
            {emails.length > 1 && (
              <button
                type="button"
                onClick={() => removeEmail(i)}
                className="rounded-lg px-3 text-white/30 transition-colors hover:text-white/60"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}

        {emails.length < 5 && (
          <button
            type="button"
            onClick={addEmail}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/[0.1] py-2.5 text-sm text-white/40 transition-colors hover:border-white/20 hover:text-white/60"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3v10M3 8h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Add another email
          </button>
        )}

        {error && <p className="text-center text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#22c55e] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#16a34a] disabled:opacity-50"
        >
          {loading ? 'Sending Invites...' : 'Send Invites'}
        </button>
      </form>
    </div>
  );
}

export default function ReferPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <Suspense fallback={<div className="text-sm text-white/40">Loading...</div>}>
        <ReferForm />
      </Suspense>
    </main>
  );
}
