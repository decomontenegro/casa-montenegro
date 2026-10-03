import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      title: 'Limpar cozinha',
      description: 'Organizar tudo e limpar os móveis',
      status: 'pending',
      priority: 'high',
      dueDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    },
  ])
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      id: 'task_' + Math.random().toString(36).substring(7),
      ...body,
      createdAt: new Date().toISOString(),
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
