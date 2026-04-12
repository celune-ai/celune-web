export async function register() {
  if (process.env.SENTRY_AUTH_TOKEN) {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      await import('./sentry.server.config');
    }
    if (process.env.NEXT_RUNTIME === 'edge') {
      await import('./sentry.edge.config');
    }
  }
}

export const onRequestError = process.env.SENTRY_AUTH_TOKEN
  ? async (
      ...args: Parameters<typeof import('@sentry/nextjs').captureRequestError>
    ) => {
      const { captureRequestError } = await import('@sentry/nextjs');
      return captureRequestError(...args);
    }
  : undefined;
