import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Celune <hello@celune.ai>';
const AGENTMAIL_INBOX = process.env.AGENTMAIL_INBOX;

// Resend template IDs — edit templates at resend.com/templates
const WAITLIST_TEMPLATE_ID =
  process.env.RESEND_WAITLIST_TEMPLATE_ID ?? 'f6e7e9e8-02aa-4ddc-bef2-c7ecc864bed2';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Cache template HTML to avoid fetching on every signup (5 min TTL)
let templateCache: { html: string; fetchedAt: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

async function getTemplateHtml(templateId: string): Promise<string | null> {
  if (!resend) return null;

  const now = Date.now();
  if (templateCache && now - templateCache.fetchedAt < CACHE_TTL) {
    return templateCache.html;
  }

  try {
    const tmpl = await resend.templates.get(templateId);
    if (tmpl.data?.html) {
      templateCache = { html: tmpl.data.html, fetchedAt: now };
      return tmpl.data.html;
    }
  } catch {
    // Template fetch failed — fall through to null
  }
  return null;
}

/**
 * Send a waitlist welcome email via Resend.
 * Fetches the template from Resend dashboard so you can edit it without code deploys.
 * Falls back to inline HTML if template fetch fails.
 */
export async function sendWaitlistWelcome(email: string): Promise<boolean> {
  if (!resend) return false;

  // Try to use Resend dashboard template
  const templateHtml = await getTemplateHtml(WAITLIST_TEMPLATE_ID);

  const html =
    templateHtml ||
    `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; background: #08080a; color: #e5e5e5;">
      <img src="https://celune.ai/celune_light.png" alt="Celune" width="110" style="margin-bottom: 32px;" />
      <h1 style="font-size: 28px; font-weight: 600; color: #ffffff; margin: 0 0 8px;">You're on the list!</h1>
      <p style="font-size: 16px; line-height: 1.65; color: #a3a3a3; margin: 0 0 32px;">
        Thanks for signing up for early access to Celune. We're onboarding users in small batches to ensure a great experience.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #a3a3a3; margin: 0 0 24px;">
        We'll reach out with your personal access code once we open the next round.
      </p>
      <p style="font-size: 14px; color: #525252; margin: 32px 0 0;">— Eric & the Celune Team</p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "You're on the Celune waitlist!",
    html,
  });

  return true;
}

/**
 * Forward waitlist signup to an agentmail inbox for agent processing.
 */
export async function forwardToAgentmail(email: string, source: string): Promise<boolean> {
  if (!resend || !AGENTMAIL_INBOX) return false;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: AGENTMAIL_INBOX,
    subject: `New waitlist signup: ${email}`,
    text: `New early access request:\n\nEmail: ${email}\nSource: ${source}\nTime: ${new Date().toISOString()}`,
  });

  return true;
}
