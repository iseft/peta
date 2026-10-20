import { timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Called by the collections' afterChange hooks (marketing/utils/revalidate.ts)
// with the shared secret; anyone else is refused.
export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET
  const given = request.headers.get('x-revalidate-secret') ?? ''
  if (!expected || !safeEqual(given, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { path } = (await request.json()) as { path?: unknown }
  if (typeof path !== 'string' || !path.startsWith('/')) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 })
  }

  revalidatePath(path === '/home' ? '/' : path)
  return NextResponse.json({ revalidated: true, path })
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}
