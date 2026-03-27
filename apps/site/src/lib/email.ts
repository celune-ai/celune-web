const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Celune <hello@celune.ai>';
const AGENTMAIL_INBOX = process.env.AGENTMAIL_INBOX;

/**
 * Send a waitlist welcome email via Resend.
 * Uses the HTML template from apps/platform/email-templates/waitlist-confirmation.html.
 */
export async function sendWaitlistWelcome(email: string): Promise<boolean> {
  if (!RESEND_API_KEY) return false;

  const payload = {
    from: FROM_EMAIL,
    to: email,
    subject: "You're on the Celune waitlist!",
    html: `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; background: #08080a; color: #e5e5e5;">
        <img src="https://celune.ai/celune_light.png" alt="Celune" width="110" style="margin-bottom: 32px;" />
        <h1 style="font-size: 28px; font-weight: 600; color: #ffffff; margin: 0 0 8px;">You're on the list!</h1>
        <p style="font-size: 16px; line-height: 1.65; color: #a3a3a3; margin: 0 0 32px;">
          Thanks for signing up for early access to Celune. We're onboarding users in small batches to ensure a great experience.
        </p>
        <div style="background: #0f1419; border: 1px solid #1f2937; border-radius: 16px; padding: 28px; margin: 0 0 32px;">
          <p style="margin: 0 0 16px; font-size: 14px; font-weight: 600; color: #d4d4d4;">What happens next:</p>
          <p style="margin: 0 0 8px; font-size: 14px; color: #a3a3a3; line-height: 1.5;">
            <span style="color: #22c55e; margin-right: 8px;">1.</span> We review your signup and prepare your access code
          </p>
          <p style="margin: 0 0 8px; font-size: 14px; color: #a3a3a3; line-height: 1.5;">
            <span style="color: #22c55e; margin-right: 8px;">2.</span> You'll receive an email with your personal access code
          </p>
          <p style="margin: 0; font-size: 14px; color: #a3a3a3; line-height: 1.5;">
            <span style="color: #22c55e; margin-right: 8px;">3.</span> Use the code to create your account and meet your agent team
          </p>
        </div>
        <p style="font-size: 14px; line-height: 1.5; color: #a3a3a3; margin: 0 0 32px;">
          Follow along on <a href="https://x.com/celune_ai" style="color: #22c55e; text-decoration: none;">X / Twitter</a> for build-in-public updates.
        </p>
        <div style="height: 1px; background: linear-gradient(to right, transparent, #1f2937, transparent); margin: 0 0 24px;"></div>
        <p style="font-size: 13px; color: #525252; margin: 0;">— Eric & the Celune Team</p>
      </div>
    `,
  };

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
