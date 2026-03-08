import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Celune',
  description: 'How Celune collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-neutral-300">
      <Link href="/" className="mb-8 inline-block text-sm text-neutral-500 hover:text-white">
        &larr; Back to Celune
      </Link>

      <h1 className="mb-8 text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="mb-6 text-sm text-neutral-500">Last updated: March 8, 2026</p>

      <div className="space-y-8 text-sm leading-relaxed">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">1. Information We Collect</h2>
          <p>
            When you sign up for Celune, we collect your email address and any profile information you provide.
            When you use the waitlist, we collect your email address and optional UTM tracking parameters.
            We also collect usage data such as page views and feature interactions through our analytics provider (PostHog).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-neutral-400">
            <li>Provide and maintain the Celune platform</li>
            <li>Send you product updates and waitlist notifications</li>
            <li>Improve our services through analytics</li>
            <li>Respond to support requests</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">3. Data Storage & Security</h2>
          <p>
            Your data is stored securely using Supabase (PostgreSQL) with row-level security policies.
            All data is encrypted in transit (TLS) and at rest. We do not sell or share your personal data
            with third parties except as required to operate the service (e.g., email delivery via Resend).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">4. Cookies & Analytics</h2>
          <p>
            We use PostHog for product analytics. PostHog may set cookies to track sessions.
            We also use Vercel Analytics and Speed Insights for performance monitoring.
            These tools collect anonymized usage data and do not track you across other websites.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">5. Your Rights</h2>
          <p>
            You can request access to, correction of, or deletion of your personal data at any time
            by contacting us at{' '}
            <a href="mailto:hello@celune.ai" className="text-white underline">hello@celune.ai</a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">6. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of significant changes
            via email or through the platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">7. Contact</h2>
          <p>
            If you have questions about this privacy policy, contact us at{' '}
            <a href="mailto:hello@celune.ai" className="text-white underline">hello@celune.ai</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
