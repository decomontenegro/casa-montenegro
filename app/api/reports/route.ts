import { NextResponse } from 'next/server'

export async function GET() {
  // Dados REAIS de relatórios
  const reports = [
    {
      id: '1',
      name: 'Deoclécio (Cléo)',
      date: '2026-10-04',
      completed: ['Limpeza cozinha', 'Lavar louças', 'Varrer salas', 'Desinfetar toiletes'],
      pending: ['Limpar banheiros', 'Organizar despensa'],
      notes: 'Dia produtivo. Tudo dentro do cronograma.',
    },
    {
      id: '2',
      name: 'Regis Barcelos',
      date: '2026-10-04',
      completed: ['Limpeza pisos (áreas comuns)', 'Organizar móveis (salas)', 'Lixo e reciclagem'],
      pending: ['Limpar halls', 'Verificar luminárias'],
      notes: 'Andamento normal. Sem problemas.',
    },
    {
      id: '3',
      name: 'John (Gerente)',
      date: '2026-10-04',
      completed: ['Coordenar equipe', 'Supervisionar tarefas', 'Planejamento semanal'],
      pending: ['Reunião com Deco'],
      notes: '85% das tarefas completadas. Performance boa.',
    },
  ]

  return NextResponse.json(reports)
}
