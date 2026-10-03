import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      token: '***',
      user: {
        id: 'user_123',
        email: body.email,
        name: 'User',
        role: 'member',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
