import { buildFeedbackMailto } from '@/lib/feedback-mailto';

describe('buildFeedbackMailto', () => {
  it('addresses support with the app version and platform', () => {
    const url = buildFeedbackMailto({ appVersion: '1.0.0', platform: 'android 36' });

    expect(url.startsWith('mailto:support@peta.invalid?subject=')).toBe(true);
    const body = decodeURIComponent(url.split('&body=')[1]);
    expect(body).toContain('App 1.0.0 · android 36');
  });
});
