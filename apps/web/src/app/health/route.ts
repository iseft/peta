// Railway's healthcheck target. Not under `/api`, which Payload owns.
export const dynamic = 'force-dynamic'

export function GET() {
  return new Response('ok', {
    status: 200,
    headers: { 'content-type': 'text/plain' },
  })
}
