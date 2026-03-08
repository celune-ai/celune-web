/**
 * Centralized branding constants for the Celune marketing site.
 * All user-facing brand strings should reference this module.
 */

// ─── Core identity ──────────────────────────────────────────────────────────

export const APP_NAME = 'Celune';
export const APP_TAGLINE = 'Agentic Engineering on Autopilot';
export const APP_DESCRIPTION = 'AI Agents That Ship Code While You Sleep';
export const COMPANY_NAME = 'Celune';

// ─── Domains ─────────────────────────────────────────────────────────────────

export const DOMAIN_APP = process.env.NEXT_PUBLIC_APP_DOMAIN ?? 'app.celune.ai';
export const DOMAIN_MARKETING = process.env.NEXT_PUBLIC_MARKETING_DOMAIN ?? 'celune.ai';
export const DOMAIN_DOCS = process.env.NEXT_PUBLIC_DOCS_DOMAIN ?? 'docs.celune.ai';

// ─── URLs (derived from domains) ─────────────────────────────────────────────

export const URL_APP = `https://${DOMAIN_APP}`;
export const URL_MARKETING = `https://${DOMAIN_MARKETING}`;
export const URL_DOCS = `https://${DOMAIN_DOCS}`;
export const URL_SIGNIN = `${URL_APP}/login`;

// ─── Contact ─────────────────────────────────────────────────────────────────

export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'hello@celune.ai';

// ─── Social / external ──────────────────────────────────────────────────────

export const SOCIAL_GITHUB = 'https://github.com/celune-ai';
export const SOCIAL_TWITTER = 'https://x.com/celune_ai';

// ─── Copyright ───────────────────────────────────────────────────────────────

export const COPYRIGHT = `© ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.`;
