import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return NextResponse.json({
    id,
    title: 'Mock Report',
    date: new Date().toISOString().split('T')[0],
    status: 'completed',
    data: { total: 100, count: 5 },
  })
}
