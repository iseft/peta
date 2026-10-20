import { accountPortalSignInUrl } from '@/lib/account-portal';

const key = (host: string, kind: 'test' | 'live') => `pk_${kind}_${btoa(`${host}$`)}`;

describe('accountPortalSignInUrl', () => {
  it('finds the development Account Portal', () => {
    expect(accountPortalSignInUrl(key('happy-cat-12.clerk.accounts.dev', 'test'))).toBe(
      'https://happy-cat-12.accounts.dev/sign-in',
    );
  });

  it('finds the production Account Portal', () => {
    expect(accountPortalSignInUrl(key('clerk.example.com', 'live'))).toBe(
      'https://accounts.example.com/sign-in',
    );
  });

  it('gives up on a malformed key', () => {
    expect(accountPortalSignInUrl('')).toBeNull();
  });
});
