import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    total: 50,
    count: 1,
    byCategory: {
      food: 50,
    },
  })
}
