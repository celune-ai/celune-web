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
export async function sendWaitlistWelcome(email: string, referralCode?: string): Promise<boolean> {
  if (!resend) return false;

  // Try to use Resend dashboard template
  const templateHtml = await getTemplateHtml(WAITLIST_TEMPLATE_ID);

  const referralSection = referralCode
    ? `
      <div style="margin: 24px 0 0; padding: 20px; border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px; background: rgba(34, 197, 94, 0.05); text-align: center;">
        <p style="font-size: 13px; color: #a3a3a3; margin: 0 0 12px;">Know someone who'd love Celune?</p>
        <a href="https://celune.ai/?refer=${referralCode}#signup" style="display: inline-block; background: rgba(34, 197, 94, 0.15); color: #22c55e; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; border: 1px solid rgba(34, 197, 94, 0.3);">
          Refer a Friend
        </a>
        <p style="font-size: 11px; color: #525252; margin: 8px 0 0;">Refer 2 friends to unlock early access.</p>
      </div>
    `
    : '';

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
      ${referralSection}
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
 * Send a referral invite email via Resend.
 * Branded dark-theme email inviting someone to join the Celune waitlist.
 */
export async function sendReferralInvite(toEmail: string, referrerEmail: string): Promise<boolean> {
  if (!resend) return false;

  const signupUrl = `https://celune.ai?ref=${encodeURIComponent(referrerEmail)}#signup`;

  const html = `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; background: #08080a; color: #e5e5e5;">
      <img src="https://celune.ai/celune_light.png" alt="Celune" width="110" style="margin-bottom: 32px;" />

      <h1 style="font-size: 28px; font-weight: 600; color: #ffffff; margin: 0 0 16px;">${referrerEmail} invited you to Celune</h1>

      <p style="font-size: 16px; line-height: 1.65; color: #a3a3a3; margin: 0 0 28px;">
        Your friend thinks you'd be a great fit for Celune &mdash; an AI-powered platform where autonomous agent teams research, plan, build, review code, and ship your projects on autopilot.
      </p>

      <!-- What Celune does -->
      <div style="background: #111118; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; margin: 0 0 28px;">
        <p style="font-size: 14px; font-weight: 600; color: #ffffff; margin: 0 0 16px;">What you get with Celune:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; vertical-align: top; width: 24px;">
              <span style="color: #22c55e; font-size: 14px;">&#10003;</span>
            </td>
            <td style="padding: 6px 0; font-size: 14px; color: #a3a3a3; line-height: 1.5;">
              <strong style="color: #e5e5e5;">A team of 9 AI agents</strong> &mdash; each specialized in engineering, design, security, research, and more
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; vertical-align: top; width: 24px;">
              <span style="color: #22c55e; font-size: 14px;">&#10003;</span>
            </td>
            <td style="padding: 6px 0; font-size: 14px; color: #a3a3a3; line-height: 1.5;">
              <strong style="color: #e5e5e5;">Full project lifecycle</strong> &mdash; from PRDs and task planning to code review, design feedback, and retros
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; vertical-align: top; width: 24px;">
              <span style="color: #22c55e; font-size: 14px;">&#10003;</span>
            </td>
            <td style="padding: 6px 0; font-size: 14px; color: #a3a3a3; line-height: 1.5;">
              <strong style="color: #e5e5e5;">Ships while you sleep</strong> &mdash; agents work overnight, hand off progress, and keep building 24/7
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; vertical-align: top; width: 24px;">
              <span style="color: #22c55e; font-size: 14px;">&#10003;</span>
            </td>
            <td style="padding: 6px 0; font-size: 14px; color: #a3a3a3; line-height: 1.5;">
              <strong style="color: #e5e5e5;">Your second brain</strong> &mdash; a knowledge graph that remembers decisions, preferences, and context across every project
            </td>
          </tr>
        </table>
      </div>

      <!-- CTA -->
      <div style="text-align: center; margin: 0 0 32px;">
        <a href="${signupUrl}" style="display: inline-block; background: #22c55e; color: #000; padding: 16px 40px; border-radius: 10px; font-size: 16px; font-weight: 700; text-decoration: none; letter-spacing: 0.01em;">
          Learn More &amp; Join the Waitlist
        </a>
        <p style="font-size: 12px; color: #525252; margin: 12px 0 0;">Early access is free for a limited time.</p>
      </div>

      <!-- Divider -->
      <div style="border-top: 1px solid rgba(255,255,255,0.06); margin: 0 0 24px;"></div>

      <p style="font-size: 13px; color: #525252; margin: 0 0 8px;">
        Follow along on <a href="https://x.com/celune_ai" style="color: #22c55e; text-decoration: none;">X / Twitter</a> for build-in-public updates and sneak peeks.
      </p>
      <p style="font-size: 13px; color: #525252; margin: 0 0 24px;">&mdash; Eric &amp; the Celune Team</p>

      <p style="font-size: 11px; color: #3a3a3a; margin: 0;">
        You're receiving this because ${referrerEmail} referred you. If this wasn't meant for you, you can safely ignore this email.
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
      subject: `${referrerEmail} invited you to try Celune`,
      html,
    });
    return true;
  } catch {
    return false;
  }
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
