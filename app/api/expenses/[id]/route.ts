import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return NextResponse.json({
    id,
    description: 'Mock Expense',
    amount: 100,
    category: 'food',
    date: new Date().toISOString().split('T')[0],
    userId: 'user_123',
  })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  return NextResponse.json({ id, ...body, updated: true })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return NextResponse.json({ message: 'Expense deleted successfully', id })
}
