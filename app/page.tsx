'use client'

import { useState, useEffect } from 'react'
import {
  Home,
  CheckCircle2,
  Users,
  BarChart3,
  Clock,
  AlertCircle,
  ChefHat,
  Droplets,
  Sofa,
  Bed,
  Warehouse,
  Shirt,
  Menu,
  X,
  TrendingUp,
  DollarSign,
} from 'lucide-react'

interface Task {
  id: string
  title: string
  space: string
  responsible: string
  status: 'pending' | 'completed'
  priority: 'high' | 'medium' | 'low'
  dueDate?: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  phone?: string
  email?: string
}

interface DailyReport {
  name: string
  date: string
  completed: string[]
  pending: string[]
  notes?: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [reports, setReports] = useState<DailyReport[]>([])

  // Load data from API on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load team members
        const teamRes = await fetch('/api/team')
        if (teamRes.ok) {
          const teamData = await teamRes.json()
          setTeamMembers(teamData)
        }

        // Load tasks
        const tasksRes = await fetch('/api/tasks')
        if (tasksRes.ok) {
          const tasksData = await tasksRes.json()
          setTasks(tasksData)
        }

        // Load reports
        const reportsRes = await fetch('/api/reports')
        if (reportsRes.ok) {
          const reportsData = await reportsRes.json()
          setReports(reportsData)
        }
      } catch (error) {
        console.log('Using fallback data')
        // Fallback data if API fails
        setTeamMembers(defaultTeamMembers)
        setTasks(defaultTasks)
        setReports(defaultReports)
      }
    }

    loadData()
  }, [])

  // Default data (fallback se API falhar)
  const defaultTeamMembers: TeamMember[] = [
    { id: '1', name: 'André Montenegro (Deco)', role: 'Dono/Admin', phone: '(85) 8817-7777', email: 'deco@casa.com' },
    { id: '2', name: 'Daniella', role: 'Co-dona/Admin', email: 'daniella@casa.com' },
    { id: '3', name: 'John', role: 'Gerente', email: 'john@casa.com' },
    { id: '4', name: 'Jessica', role: 'Financeiro', email: 'jessica@casa.com' },
    { id: '5', name: 'Deoclécio (Cléo)', role: 'Operação/Limpeza', email: 'cleo@casa.com' },
    { id: '6', name: 'Regis Barcelos', role: 'Operação/Limpeza', phone: '(85) 9656-5120', email: 'regis@casa.com' },
    { id: '7', name: 'Menina', role: 'Diarista', email: 'menina@casa.com' },
  ]

  const defaultTasks: Task[] = [
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

  const defaultReports: DailyReport[] = [
    {
      name: 'Deoclécio (Cléo)',
      date: '2026-10-04',
      completed: ['Limpeza cozinha', 'Lavar louças', 'Varrer salas', 'Desinfetar toiletes'],
      pending: ['Limpar banheiros', 'Organizar despensa'],
      notes: 'Dia produtivo. Tudo dentro do cronograma.',
    },
    {
      name: 'Regis Barcelos',
      date: '2026-10-04',
      completed: ['Limpeza pisos (áreas comuns)', 'Organizar móveis (salas)', 'Lixo e reciclagem'],
      pending: ['Limpar halls', 'Verificar luminárias'],
      notes: 'Andamento normal. Sem problemas.',
    },
    {
      name: 'John (Gerente)',
      date: '2026-10-04',
      completed: ['Coordenar equipe', 'Supervisionar tarefas', 'Planejamento semanal'],
      pending: ['Reunião com Deco'],
      notes: '85% das tarefas completadas. Performance boa.',
    },
  ]

  // Use state data or defaults
  const displayTeamMembers = teamMembers.length > 0 ? teamMembers : defaultTeamMembers
  const displayTasks = tasks.length > 0 ? tasks : defaultTasks
  const displayReports = reports.length > 0 ? reports : defaultReports

  // MÉTRICAS
  const pendingTasks = displayTasks.filter(t => t.status === 'pending').length
  const completedTasks = displayTasks.filter(t => t.status === 'completed').length
  const completionRate = Math.round((completedTasks / displayTasks.length) * 100)
  const highPriorityTasks = displayTasks.filter(t => t.priority === 'high' && t.status === 'pending').length

  const spaces = ['Cozinha', 'Banheiros', 'Salas', 'Quartos', 'Áreas Comuns', 'Lavanderia']
  const spaceIcons = {
    'Cozinha': ChefHat,
    'Banheiros': Droplets,
    'Salas': Sofa,
    'Quartos': Bed,
    'Áreas Comuns': Warehouse,
    'Lavanderia': Shirt,
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tasks', label: 'Tarefas', icon: CheckCircle2 },
    { id: 'team', label: 'Equipe', icon: Users },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* HEADER */}
      <header className="bg-slate-900/50 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Home className="w-10 h-10 text-emerald-500" />
              <div>
                <h1 className="text-3xl font-bold text-white">Casa Montenegro</h1>
                <p className="text-slate-400 text-sm">Gerenciador de Tarefas e Equipe</p>
              </div>
            </div>
            <button
              className="md:hidden p-2 hover:bg-slate-700 rounded-lg transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* NAVIGATION */}
          <nav className={`flex gap-2 flex-wrap ${mobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <>
            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium mb-1">Pendentes</p>
                    <p className="text-4xl font-bold text-white">{pendingTasks}</p>
                  </div>
                  <Clock className="w-12 h-12 text-blue-200 opacity-50" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium mb-1">Concluídas</p>
                    <p className="text-4xl font-bold text-white">{completedTasks}</p>
                  </div>
                  <CheckCircle2 className="w-12 h-12 text-emerald-200 opacity-50" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100 text-sm font-medium mb-1">Taxa</p>
                    <p className="text-4xl font-bold text-white">{completionRate}%</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-amber-200 opacity-50" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-medium mb-1">Urgentes</p>
                    <p className="text-4xl font-bold text-white">{highPriorityTasks}</p>
                  </div>
                  <AlertCircle className="w-12 h-12 text-red-200 opacity-50" />
                </div>
              </div>
            </div>

            {/* PRÓXIMAS TAREFAS */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-400" />
                Próximas Tarefas
              </h2>
              <div className="space-y-3">
                {displayTasks
                  .filter(t => t.status === 'pending')
                  .slice(0, 6)
                  .map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                      <div className="flex-1">
                        <p className="font-semibold text-white">{task.title}</p>
                        <p className="text-sm text-slate-400">{task.space} • {task.responsible}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-900/50 text-red-300' :
                          task.priority === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                          'bg-green-900/50 text-green-300'
                        }`}>
                          {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {/* TASKS */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {spaces.map((space) => {
              const Icon = spaceIcons[space as keyof typeof spaceIcons]
              const spaceTasks = displayTasks.filter(t => t.space === space)
              return (
                <div key={space} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden shadow-xl">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-700 p-6">
                    <Icon className="w-8 h-8 text-emerald-100" />
                    <h3 className="text-xl font-bold text-white">{space}</h3>
                    <span className="ml-auto bg-emerald-900/50 px-3 py-1 rounded-full text-sm text-emerald-100">
                      {spaceTasks.filter(t => t.status === 'completed').length}/{spaceTasks.length}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    {spaceTasks.map((task) => (
                      <div key={task.id} className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        task.status === 'completed'
                          ? 'bg-emerald-900/20 border border-emerald-700'
                          : 'bg-slate-700/50 border border-slate-600'
                      }`}>
                        <div className="flex items-center gap-3 flex-1">
                          {task.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Clock className="w-5 h-5 text-slate-400" />
                          )}
                          <div>
                            <p className={`font-medium ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-slate-400">{task.responsible}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === 'completed'
                            ? 'bg-emerald-900/50 text-emerald-300'
                            : 'bg-slate-600 text-slate-300'
                        }`}>
                          {task.status === 'completed' ? 'Feita' : 'Pendente'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* TEAM */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTeamMembers.map((member) => (
              <div key={member.id} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:border-emerald-500">
                <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                <p className="text-sm text-emerald-400 font-semibold mb-4">{member.role}</p>
                {member.email && (
                  <p className="text-sm text-slate-400 mb-2">📧 {member.email}</p>
                )}
                {member.phone && (
                  <p className="text-sm text-slate-400">📱 {member.phone}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {displayReports.map((report, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{report.name}</h3>
                  <span className="bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
                    {report.date}
                  </span>
                </div>

                {report.notes && (
                  <p className="text-slate-300 text-sm mb-4 italic">💬 {report.notes}</p>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-emerald-400 font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Concluído ({report.completed.length})
                    </h4>
                    <ul className="space-y-2">
                      {report.completed.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Pendente ({report.pending.length})
                    </h4>
                    <ul className="space-y-2">
                      {report.pending.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300">
                          <span className="w-2 h-2 bg-amber-500 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center text-slate-400 text-sm">
          <p>Casa Montenegro © 2026 • Sistema de Gerenciamento Doméstico</p>
          <p className="mt-2">Equipe estruturada • Tarefas organizadas • Relatórios em tempo real</p>
        </div>
      </footer>
    </div>
  )
}
