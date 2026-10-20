/* eslint-disable @next/next/no-img-element -- Payload renders these outside next/image's config. */

// Brand graphics for the CMS: Logo on the login screen, Icon in the nav.

export const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
    <img src="/logo.svg" alt="" width={56} height={56} />
    <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
      Peta
    </span>
  </div>
)

export const Icon = () => <img src="/logo.svg" alt="Peta" width={28} height={28} />
