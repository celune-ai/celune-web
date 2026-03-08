import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Celune <hello@celune.ai>';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/**
 * Send a waitlist welcome email. Degrades gracefully if RESEND_API_KEY is not set.
 * Returns true if sent, false if skipped (no API key).
 */
export async function sendWaitlistWelcome(email: string): Promise<boolean> {
  if (!resend) return false;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "You're on the Celune waitlist!",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <img src="https://celune.ai/celune_light.svg" alt="Celune" width="100" style="margin-bottom: 32px;" />
        <h1 style="font-size: 24px; font-weight: 600; color: #ffffff; margin: 0 0 16px;">You're on the list!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #a3a3a3; margin: 0 0 24px;">
          Thanks for signing up for early access to Celune. We're building autonomous engineering agents that ship code while you sleep.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #a3a3a3; margin: 0 0 24px;">
          We'll reach out when your spot is ready. In the meantime, follow us on
          <a href="https://x.com/celune_ai" style="color: #22c55e; text-decoration: none;">X</a>
          for updates.
        </p>
        <p style="font-size: 14px; color: #737373; margin: 32px 0 0;">
          — The Celune Team
        </p>
      </div>
    `,
  });

  return true;
}
