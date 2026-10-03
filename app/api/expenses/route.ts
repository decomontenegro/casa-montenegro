import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      description: 'Almoço na casa',
      amount: 50,
      category: 'food',
      date: new Date().toISOString().split('T')[0],
      userId: 'user_123',
      createdAt: new Date().toISOString(),
    },
  ])
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      id: 'exp_' + Math.random().toString(36).substring(7),
      ...body,
      createdAt: new Date().toISOString(),
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
