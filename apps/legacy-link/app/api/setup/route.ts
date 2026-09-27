import { auth } from '@clerk/nextjs/server'
import { seed } from '@/lib/seed'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { userId } = await auth()
  const { searchParams } = new URL(request.url)
  const secretKey = searchParams.get('key')

  // Guard: Must be authenticated or present valid setup secret
  const isAuthorized =
    Boolean(userId) ||
    Boolean(process.env.SETUP_SECRET && secretKey === process.env.SETUP_SECRET) ||
    process.env.NODE_ENV !== 'production'

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized DDL execution' }, { status: 401 })
  }

  try {
    await seed()
    return NextResponse.json({ message: 'Database schema verified and initialized successfully' })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}