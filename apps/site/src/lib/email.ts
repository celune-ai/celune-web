import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Celune <hello@celune.ai>';
const AGENTMAIL_INBOX = process.env.AGENTMAIL_INBOX;

// Resend template IDs — edit templates at resend.com/templates
const WAITLIST_TEMPLATE_ID =
  process.env.RESEND_WAITLIST_TEMPLATE_ID ?? 'f6e7e9e8-02aa-4ddc-bef2-c7ecc864bed2';
const REFERRAL_TEMPLATE_ID =
  process.env.RESEND_REFERRAL_TEMPLATE_ID ?? '6ea83acf-7c7e-4d2f-995a-6f964486c82e';

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
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; background: #060a07; color: #e5e5e5;">
      <!--[if !mso]><!-->
      <style>
        .logo-light { display: block !important; }
        .logo-dark { display: none !important; }
        @media (prefers-color-scheme: light) {
          .logo-light { display: none !important; }
          .logo-dark { display: block !important; }
        }
      </style>
      <!--<![endif]-->
      <img class="logo-light" src="https://celune.ai/celune-light.png" alt="Celune" width="110" style="display:block;margin-bottom:32px;" />
      <img class="logo-dark" src="https://celune.ai/celune-dark.png" alt="Celune" width="110" style="display:none;margin-bottom:32px;" />
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

  // Try Resend dashboard template first (alias: friend-referral-invitation)
  if (REFERRAL_TEMPLATE_ID) {
    try {
      const tmpl = await resend.templates.get(REFERRAL_TEMPLATE_ID);
      if (tmpl.data?.html) {
        // Replace template variables in the fetched HTML
        let templateHtml = tmpl.data.html;
        templateHtml = templateHtml.replace(/\{\{referrer_email\}\}/g, referrerEmail);
        templateHtml = templateHtml.replace(/\{\{signup_url\}\}/g, signupUrl);

        await resend.emails.send({
          from: FROM_EMAIL,
          to: toEmail,
          subject: `${referrerEmail} invited you to try Celune`,
          html: templateHtml,
        });
        return true;
      }
    } catch {
      // Template fetch failed — fall through to inline HTML
    }
  }

  // Fallback: inline HTML
  const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');*{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif!important;}code,.code{font-family:'SF Mono','Fira Code',Menlo,Consolas,monospace!important;}.logo-light{display:block!important;}.logo-dark{display:none!important;}@media(prefers-color-scheme:light){.logo-light{display:none!important;}.logo-dark{display:block!important;}}</style></head><body style="margin:0;padding:0;background-color:#060a07;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#060a07"><tr><td align="center" style="padding:40px 16px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
  <tr><td style="padding:0 0 40px"><img class="logo-light" src="https://celune.ai/celune-light.png" alt="Celune" width="110" style="display:block"/><img class="logo-dark" src="https://celune.ai/celune-dark.png" alt="Celune" width="110" style="display:none"/></td></tr>
  <tr><td style="padding:0 0 8px"><h1 style="margin:0;font-size:28px;font-weight:600;color:#ffffff;line-height:1.3">${referrerEmail} invited you to Celune</h1></td></tr>
  <tr><td style="padding:0 0 32px"><p style="margin:0;font-size:16px;line-height:1.65;color:#a3a3a3">Your friend thinks you'd be a great fit for Celune &mdash; an AI-powered platform where autonomous agent teams research, plan, build, review, and ship your projects on autopilot.</p></td></tr>
  <tr><td style="padding:0 0 32px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a1a0f;border:1px solid #1a3a24;border-radius:16px">
      <tr><td style="padding:28px">
        <p style="margin:0 0 16px;font-size:14px;font-weight:600;color:#d4d4d4">What you get with Celune:</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:6px 0;font-size:14px;color:#a3a3a3;line-height:1.5"><span style="color:#22c55e;margin-right:8px">✦</span><strong style="color:#e5e5e5">A team of 9 AI agents</strong> &mdash; each specialized in engineering, design, security, research, and more</td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#a3a3a3;line-height:1.5"><span style="color:#22c55e;margin-right:8px">✦</span><strong style="color:#e5e5e5">Full project lifecycle</strong> &mdash; from PRDs and task planning to code review, design feedback, and retros</td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#a3a3a3;line-height:1.5"><span style="color:#22c55e;margin-right:8px">✦</span><strong style="color:#e5e5e5">Ships while you sleep</strong> &mdash; agents work overnight, hand off progress, and keep building 24/7</td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#a3a3a3;line-height:1.5"><span style="color:#22c55e;margin-right:8px">✦</span><strong style="color:#e5e5e5">Your second brain</strong> &mdash; a knowledge graph that remembers decisions, preferences, and context across every project</td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:0 0 16px" align="center"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#22c55e;border-radius:10px"><a href="${signupUrl}" style="display:inline-block;padding:16px 48px;font-size:16px;font-weight:700;color:#000000;text-decoration:none;letter-spacing:0.2px">Learn More &amp; Join the Waitlist</a></td></tr></table></td></tr>
  <tr><td style="padding:0 0 40px" align="center"><p style="margin:0;font-size:13px;color:#525252">Early access is free for a limited time.</p></td></tr>
  <tr><td style="padding:0 0 32px"><div style="height:1px;background:linear-gradient(to right,transparent,#1a3a24,transparent)"></div></td></tr>
  <tr><td style="padding:0 0 32px"><p style="margin:0;font-size:14px;color:#a3a3a3;line-height:1.5">Follow along on <a href="https://x.com/celuneapp" style="color:#22c55e;text-decoration:none">X / Twitter</a> for build-in-public updates and sneak peeks.</p></td></tr>
  <tr><td style="padding:0 0 8px"><p style="margin:0;font-size:13px;color:#525252">&mdash; Eric &amp; the Celune Team</p></td></tr>
  <tr><td><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="padding:16px 0"><a href="https://celune.ai" style="font-size:12px;color:#404040;text-decoration:none;margin-right:16px">celune.ai</a><a href="https://x.com/celuneapp" style="font-size:12px;color:#404040;text-decoration:none;margin-right:16px">X / Twitter</a><a href="https://docs.celune.ai" style="font-size:12px;color:#404040;text-decoration:none">Docs</a></td></tr></table></td></tr>
  <tr><td><p style="margin:0;font-size:11px;color:#333333;line-height:1.5">You're receiving this because ${referrerEmail} referred you to <a href="https://celune.ai" style="color:#404040;text-decoration:underline">celune.ai</a>. If this wasn't meant for you, you can safely ignore this email.</p></td></tr>
</table>
</td></tr></table></body></html>`;

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
