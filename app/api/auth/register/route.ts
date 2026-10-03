import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      token: '***',
      user: {
        id: 'user_' + Math.random().toString(36).substring(7),
        email: body.email,
        name: body.name,
        role: 'member',
        createdAt: new Date().toISOString(),
      },
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
