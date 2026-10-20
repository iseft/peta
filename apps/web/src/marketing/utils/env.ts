export const required = [
  'DATABASE_URL',
  'PAYLOAD_SECRET',
  'REVALIDATE_SECRET',
  // The one origin we trust for absolute links and Open Graph URLs.
  'NEXT_PUBLIC_SERVER_URL',
] as const

export function validateEnv() {
  const missing = required.filter((key) => !process.env[key])
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables:\n  ${missing.join('\n  ')}`)
  }
}
