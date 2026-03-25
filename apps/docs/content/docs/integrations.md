---
title: Integrations
description: Available integrations, categories, and setup guides for connecting external services.
---

# Integrations

Celune supports 63 integrations across 22 categories. Integrations connect your workspace to external tools and services.

## Active Integrations

These integrations have full platform support with dedicated API routes:

### GitHub

Full source control integration:

- Pull request tracking and management
- Branch monitoring
- Webhook processing for real-time updates
- Multi-installation support (connect multiple GitHub accounts/orgs)
- File conflict detection
- Context extraction from repos

**Setup:** Go to Settings > Integrations > GitHub and click Connect. You will be redirected to GitHub to authorize the Celune GitHub App.

### Slack

Team communication integration:

- Slash commands for quick actions
- Event subscriptions for real-time workspace updates
- Interactive message components
- Channel mapping configuration
- AI-powered Slack messages (Pro and Unlimited plans)

**Setup:** Go to Settings > Integrations > Slack and click Connect. Install the Celune Slack app to your workspace.

### Sentry

Error monitoring integration:

- Automatic alert routing from Sentry to your workspace
- Installation flow for connecting Sentry projects

**Setup:** Go to Settings > Integrations > Sentry and click Connect.

### AgentMail

Agent email system:

- Managed inboxes for agents
- Send and receive emails programmatically
- Email reporting and analytics

### Stripe

Billing and subscription management:

- Plan management (Builder, Pro, Unlimited)
- Customer portal for subscription changes
- Usage tracking and metering
- Webhook processing for payment events

## Integration Categories

| Category           | Examples                                          |
| ------------------ | ------------------------------------------------- |
| Source Control     | GitHub, GitLab, Bitbucket                         |
| AI Providers       | Anthropic, OpenAI, Google Gemini, Mistral, Groq   |
| Project Management | Linear, Jira, Asana, Notion                       |
| Communication      | Slack, Discord, Microsoft Teams, Telegram         |
| Databases          | Supabase, PostgreSQL, MongoDB, Redis, MySQL, Neon |
| Deployment         | Vercel, Netlify, Cloudflare                       |
| Monitoring         | Sentry, Datadog, PagerDuty                        |
| Cloud              | AWS, Google Cloud, Microsoft Azure                |
| Research           | Tavily, Firecrawl, NotebookLM                     |
| Design             | Figma                                             |
| Documentation      | Confluence                                        |
| Email              | AgentMail, Resend, Twilio                         |
| Billing            | Stripe                                            |
| Automation         | Zapier, Make                                      |
| Commerce           | Shopify                                           |
| CRM                | HubSpot, Salesforce                               |
| Data & Analytics   | Snowflake, BigQuery, Airtable, Google Analytics   |
| Testing            | Playwright                                        |
| DevOps             | Docker, Kubernetes, CircleCI, GitHub Actions      |
| Feature Flags      | LaunchDarkly                                      |
| Scheduling         | Calendly, Google Calendar, Google Workspace       |
| IDE                | Cursor, Windsurf, Claude Code                     |

## BYOK (Bring Your Own Keys)

All plans support BYOK for AI providers. Configure your own API keys for:

- Anthropic (Claude)
- OpenAI (GPT)
- Google (Gemini)
- Mistral
- Groq
- ElevenLabs (Voice)

Go to Settings > Provider Keys to manage your API keys.

## API Routes

| Route                                   | Description                   |
| --------------------------------------- | ----------------------------- |
| `GET /api/integrations/status`          | Check integration status      |
| `POST /api/integrations/sentry/install` | Install Sentry integration    |
| `GET /api/provider-keys`                | List configured provider keys |
| `GET /api/provider-keys/status`         | Check provider key validity   |

## Try It: Create a Task via the API

Use the interactive playground below to experiment with calling the Celune Tasks API. Edit the code and see the output in real time.

<CodePlayground
template="vanilla"
files={{
'/index.js': `// Example: Create a task via the Celune API
const CELUNE_API = 'https://app.celune.ai';

async function createTask() {
const response = await fetch(\`\${CELUNE_API}/api/tasks\`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': 'Bearer YOUR_API_KEY',
},
body: JSON.stringify({
title: 'Review pull request #42',
status: 'inbox',
priority: 'high',
labels: ['code-review'],
}),
});

const task = await response.json();
document.getElementById('output').textContent =
JSON.stringify(task, null, 2);
}

// Display the request shape (no real call)
document.getElementById('output').textContent = JSON.stringify({
note: 'Replace YOUR_API_KEY with a real key to make live requests.',
endpoint: 'POST /api/tasks',
body: {
title: 'Review pull request #42',
status: 'inbox',
priority: 'high',
labels: ['code-review'],
},
}, null, 2);
`,
    '/index.html': `<!DOCTYPE html>

<html>
<head>
  <style>
    body { font-family: monospace; background: #171717; color: #3ecf8e; padding: 16px; }
    pre { white-space: pre-wrap; word-break: break-word; }
    h3 { color: #bda4ff; margin-top: 0; }
  </style>
</head>
<body>
  <h3>Celune Tasks API — Request Preview</h3>
  <pre id="output">Loading...</pre>
  <script src="index.js"></script>
</body>
</html>`
  }}
/>
