import * as Sentry from '@sentry/nestjs';

// The Sentry SDK, reporting to Better Stack through its Sentry-compatible DSN.
// Sampling does not apply to errors: every exception is reported whatever this
// is set to. A tenth of requests is enough to see which endpoint is slow.
const TRACES_SAMPLE_RATE = 0.1;

Sentry.init({
  dsn: process.env.BETTERSTACK_DSN,
  tracesSampleRate: TRACES_SAMPLE_RATE,
  // Required before `Sentry.logger.*` sends anything; `SentryForwardingLogger`
  // is what calls it.
  enableLogs: true,
  enabled: !!process.env.BETTERSTACK_DSN,
});
