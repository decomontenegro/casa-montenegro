import { NextResponse } from 'next/server'

export async function GET() {
  // Dados REAIS da equipe
  const teamMembers = [
    {
      id: '1',
      name: 'André Montenegro (Deco)',
      role: 'Dono/Admin',
      phone: '(85) 8817-7777',
      email: 'deco@casa.com',
      status: 'active',
    },
    {
      id: '2',
      name: 'Daniella',
      role: 'Co-dona/Admin',
      email: 'daniella@casa.com',
      status: 'active',
    },
    {
      id: '3',
      name: 'John',
      role: 'Gerente',
      email: 'john@casa.com',
      status: 'active',
    },
    {
      id: '4',
      name: 'Jessica',
      role: 'Financeiro',
      email: 'jessica@casa.com',
      status: 'active',
    },
    {
      id: '5',
      name: 'Deoclécio (Cléo)',
      role: 'Operação/Limpeza',
      email: 'cleo@casa.com',
      status: 'active',
    },
    {
      id: '6',
      name: 'Regis Barcelos',
      role: 'Operação/Limpeza',
      phone: '(85) 9656-5120',
      email: 'regis@casa.com',
      status: 'active',
    },
    {
      id: '7',
      name: 'Menina',
      role: 'Diarista',
      email: 'menina@casa.com',
      status: 'active',
    },
  ]

  return NextResponse.json(teamMembers)
}
