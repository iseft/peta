import { healthStatusSchema } from './health-status.dto';

describe('healthStatusSchema', () => {
  it('accepts an ok status with an ISO timestamp', () => {
    expect(
      healthStatusSchema.safeParse({
        status: 'ok',
        timestamp: '2026-10-16T12:00:00.000Z',
      }).success,
    ).toBe(true);
  });

  it('refuses a timestamp that is not ISO', () => {
    expect(
      healthStatusSchema.safeParse({ status: 'ok', timestamp: 'yesterday' })
        .success,
    ).toBe(false);
  });
});
