import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    id: 'user_123',
    email: 'user@casa.com',
    name: 'User',
    role: 'member',
    createdAt: new Date().toISOString(),
  })
}
