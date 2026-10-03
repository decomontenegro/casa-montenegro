import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      name: 'João',
      email: 'joao@casa.com',
      phone: '(11) 9999-9999',
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Maria',
      email: 'maria@casa.com',
      phone: '(11) 8888-8888',
      role: 'member',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
  ])
}
