import { APP_NAME, SUPPORT_EMAIL } from '@/config';

type FeedbackContext = {
  appVersion: string;
  platform: string;
};

// A pre-filled email: the context a bug report needs, nothing personal.
export function buildFeedbackMailto(context: FeedbackContext): string {
  const subject = `${APP_NAME} feedback (${context.appVersion})`;
  const body = [
    'What happened, or what would you change?',
    '',
    '',
    '---',
    `App ${context.appVersion} · ${context.platform}`,
  ].join('\n');
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
