// The publishable key encodes the Clerk Frontend API host
// ("x.clerk.accounts.dev" in development, "clerk.example.com" in production);
// the hosted Account Portal lives at the matching accounts host.
export function accountPortalSignInUrl(publishableKey: string): string | null {
  const encoded = publishableKey.split('_')[2];
  if (!encoded) return null;
  const frontendApi = atob(encoded).replace(/\$$/, '');
  const host = frontendApi.endsWith('.clerk.accounts.dev')
    ? frontendApi.replace('.clerk.accounts.dev', '.accounts.dev')
    : frontendApi.replace(/^clerk\./, 'accounts.');
  return `https://${host}/sign-in`;
}
