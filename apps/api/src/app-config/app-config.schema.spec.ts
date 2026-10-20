import { appConfigSchema } from './app-config.schema';

const requiredConfig = {
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5435/peta',
  CLERK_SECRET_KEY: 'sk_test_1',
};

describe('appConfigSchema', () => {
  it('defaults the port when none is given', () => {
    expect(appConfigSchema.parse(requiredConfig).PORT).toBe(3000);
  });

  it('refuses to boot without a Clerk secret key', () => {
    expect(() =>
      appConfigSchema.parse({ DATABASE_URL: requiredConfig.DATABASE_URL }),
    ).toThrow();
  });

  it('drops variables it does not declare', () => {
    const config = appConfigSchema.parse({
      ...requiredConfig,
      UNDECLARED: 'x',
    });

    expect(config).not.toHaveProperty('UNDECLARED');
  });
});
