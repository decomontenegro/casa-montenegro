import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      action: 'CREATE',
      resource: 'expense',
      resourceId: '1',
      userId: 'user_123',
      ipAddress: '127.0.0.1',
      timestamp: new Date().toISOString(),
    },
  ])
}
