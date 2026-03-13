import * as Sentry from '@sentry/nextjs';

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    enableLogs: true,

    integrations: [Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] })],

    // Performance monitoring
    tracesSampleRate: 1.0,
  });
}
