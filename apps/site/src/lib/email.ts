const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Celune <hello@celune.ai>';
const AGENTMAIL_INBOX = process.env.AGENTMAIL_INBOX;

// Resend template IDs — set in Vercel env vars, or leave unset to use inline HTML fallback
const WAITLIST_TEMPLATE_ID = process.env.RESEND_WAITLIST_TEMPLATE_ID;

/**
 * Send a waitlist welcome email via Resend.
 * Uses Resend dashboard template if RESEND_WAITLIST_TEMPLATE_ID is set,
 * otherwise falls back to inline HTML.
 */
export async function sendWaitlistWelcome(email: string): Promise<boolean> {
  if (!RESEND_API_KEY) return false;

  const payload: Record<string, unknown> = {
    from: FROM_EMAIL,
    to: email,
    subject: "You're on the Celune waitlist!",
  };

  if (WAITLIST_TEMPLATE_ID) {
    // Use Resend dashboard template — edit at resend.com/templates
    payload.template_id = WAITLIST_TEMPLATE_ID;
    payload.data = { email };
  } else {
    // Fallback inline HTML
    payload.html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; background: #08080a;">
        <img src="https://celune.ai/celune_light.png" alt="Celune" width="110" style="margin-bottom: 32px;" />
        <h1 style="font-size: 24px; font-weight: 600; color: #ffffff; margin: 0 0 16px;">You're on the list!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #a3a3a3; margin: 0 0 24px;">
          Thanks for signing up for early access to Celune. We're onboarding users in small batches to ensure a great experience.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #a3a3a3; margin: 0 0 24px;">
          We'll reach out with your personal access code once we open the next round.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #a3a3a3; margin: 0 0 24px;">
          Follow along on <a href="https://x.com/celune_ai" style="color: #22c55e; text-decoration: none;">X / Twitter</a> for build-in-public updates.
        </p>
        <p style="font-size: 14px; color: #525252; margin: 32px 0 0;">— Eric & the Celune Team</p>
      </div>
    `;
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  return true;
}

/**
 * Forward waitlist signup to an agentmail inbox for agent processing.
 * Degrades gracefully if AGENTMAIL_INBOX or RESEND_API_KEY is not set.
 */
export async function forwardToAgentmail(email: string, source: string): Promise<boolean> {
  if (!RESEND_API_KEY || !AGENTMAIL_INBOX) return false;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: AGENTMAIL_INBOX,
      subject: `New waitlist signup: ${email}`,
      text: `New early access request:\n\nEmail: ${email}\nSource: ${source}\nTime: ${new Date().toISOString()}`,
    }),
  });

  return true;
}
