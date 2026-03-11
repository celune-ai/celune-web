'use client';

import { useState, useCallback } from 'react';
import type { Metadata } from 'next';

const TOPICS = [
  'Account & billing',
  'Agent setup & configuration',
  'MCP & integrations',
  'Voice & ElevenLabs',
  'Memory & Second Brain',
  'API & webhooks',
  'Bug report',
  'Feature request',
] as const;

function generateTicketNumber() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `CEL-${id}`;
}

export default function SupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const canSubmit = name.trim() && email.trim() && topic && message.trim();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSubmit) return;
      const ticket = generateTicketNumber();
      setTicketNumber(ticket);
      setSubmitted(true);
    },
    [canSubmit],
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(ticketNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [ticketNumber]);

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-[40rem] px-6 py-16 sm:px-10 sm:py-24">
        <div className="border-border bg-surface-75 rounded-lg border p-8 text-center">
          <div className="text-foreground mb-2 text-lg font-semibold">
            Request submitted
          </div>
          <p className="text-foreground-light mb-6 text-sm">
            We will respond within 48 business hours.
          </p>
          <div className="mb-6">
            <div className="text-foreground-lighter mb-1 text-xs uppercase tracking-wide">
              Ticket number
            </div>
            <button
              onClick={handleCopy}
              className="border-border bg-surface-100 hover:bg-surface-200 text-foreground inline-flex items-center gap-2 rounded-md border px-4 py-2 font-mono text-lg transition-colors"
            >
              {ticketNumber}
              <span className="text-foreground-lighter text-xs">
                {copied ? 'Copied' : 'Click to copy'}
              </span>
            </button>
          </div>
          <p className="text-foreground-lighter text-xs">
            Save this number for your records. You can reference it in any follow-up emails to{' '}
            <a href="mailto:support@celune.ai" className="text-brand hover:underline">
              support@celune.ai
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[40rem] px-6 py-16 sm:px-10 sm:py-24">
      <div className="mb-10">
        <h1 className="text-foreground mb-3 text-3xl font-light tracking-tight sm:text-4xl">
          Contact Support
        </h1>
        <p className="text-foreground-light text-base leading-relaxed">
          Need help with Celune? Fill out the form below and our team will get back to you within 48
          business hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="support-name" className="text-foreground-light text-sm font-medium">
            Name
          </label>
          <input
            id="support-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="border-border bg-surface-100 text-foreground placeholder:text-foreground-muted focus:ring-brand w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="support-email" className="text-foreground-light text-sm font-medium">
            Email
          </label>
          <input
            id="support-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="border-border bg-surface-100 text-foreground placeholder:text-foreground-muted focus:ring-brand w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="support-topic" className="text-foreground-light text-sm font-medium">
            Topic
          </label>
          <select
            id="support-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="border-border bg-surface-100 text-foreground focus:ring-brand w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
          >
            <option value="" disabled>
              Select a topic
            </option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="support-message" className="text-foreground-light text-sm font-medium">
            Message
          </label>
          <textarea
            id="support-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe what you need help with..."
            required
            rows={5}
            className="border-border bg-surface-100 text-foreground placeholder:text-foreground-muted focus:ring-brand w-full resize-none rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="bg-brand hover:bg-brand/80 border-brand-600 hover:border-brand-600/80 disabled:bg-surface-200 disabled:border-border disabled:text-foreground-muted w-full rounded-md border px-4 py-2.5 text-sm font-semibold text-black transition-colors disabled:cursor-not-allowed"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
