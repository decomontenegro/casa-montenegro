import { NextResponse } from 'next/server'

export async function GET() {
  // Dados REAIS de tarefas
  const tasks = [
    // COZINHA
    { id: '1', title: 'Limpeza geral da cozinha', space: 'Cozinha', responsible: 'Cléo', status: 'pending', priority: 'high' },
    { id: '2', title: 'Lavar louças', space: 'Cozinha', responsible: 'Cléo', status: 'completed', priority: 'high' },
    { id: '3', title: 'Organizar despensa', space: 'Cozinha', responsible: 'Regis', status: 'pending', priority: 'medium' },
    // BANHEIROS
    { id: '4', title: 'Limpar espelhos e pias', space: 'Banheiros', responsible: 'Cléo', status: 'pending', priority: 'high' },
    { id: '5', title: 'Limpar pisos', space: 'Banheiros', responsible: 'Regis', status: 'pending', priority: 'high' },
    { id: '6', title: 'Desinfetar toiletes', space: 'Banheiros', responsible: 'Cléo', status: 'completed', priority: 'high' },
    // SALAS
    { id: '7', title: 'Varrer pisos', space: 'Salas', responsible: 'Regis', status: 'pending', priority: 'medium' },
    { id: '8', title: 'Organizar móveis', space: 'Salas', responsible: 'Cléo', status: 'completed', priority: 'medium' },
    { id: '9', title: 'Limpar TV e equipamentos', space: 'Salas', responsible: 'Regis', status: 'pending', priority: 'low' },
    // QUARTOS
    { id: '10', title: 'Trocar lençol', space: 'Quartos', responsible: 'Menina', status: 'pending', priority: 'high' },
    { id: '11', title: 'Limpar pisos', space: 'Quartos', responsible: 'Cléo', status: 'pending', priority: 'medium' },
    { id: '12', title: 'Verificar luminárias', space: 'Quartos', responsible: 'Regis', status: 'completed', priority: 'low' },
    // ÁREAS COMUNS
    { id: '13', title: 'Limpar halls e corredores', space: 'Áreas Comuns', responsible: 'Regis', status: 'pending', priority: 'medium' },
    { id: '14', title: 'Varrer áreas externas', space: 'Áreas Comuns', responsible: 'Cléo', status: 'completed', priority: 'medium' },
    { id: '15', title: 'Lixo e reciclagem', space: 'Áreas Comuns', responsible: 'Cléo', status: 'pending', priority: 'high' },
    // LAVANDERIA
    { id: '16', title: 'Lavar roupas de cama', space: 'Lavanderia', responsible: 'Menina', status: 'completed', priority: 'high' },
    { id: '17', title: 'Passar e dobrar roupa', space: 'Lavanderia', responsible: 'Menina', status: 'pending', priority: 'high' },
    { id: '18', title: 'Organizar armários', space: 'Lavanderia', responsible: 'Menina', status: 'pending', priority: 'medium' },
  ]

  return NextResponse.json(tasks)
}
