import posthogLib from 'posthog-js';

export const POSTHOG_KEY = 'phc_mpxYHjhGcv6IOLQAmvA2sHfXvLNWtZPQvTqDklLS3J4';
export const POSTHOG_HOST = 'https://us.i.posthog.com';

const IS_PROD = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
let initialized = false;

export function initPostHog() {
  if (typeof window === 'undefined') return;
  if (!IS_PROD) return;
  if (initialized) return;

  try {
    posthogLib.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false,
      disable_session_recording: true,
      persistence: 'memory',
      loaded: () => {
        initialized = true;
      },
    });
    initialized = true;
  } catch {
    // PostHog init can fail — safe to ignore
  }
}

// Safe proxy — no-ops in dev and when PostHog isn't loaded
export const posthog = {
  capture: (...args: Parameters<typeof posthogLib.capture>) => {
    try {
      if (initialized) posthogLib.capture(...args);
    } catch {
      // noop
    }
  },
};
