'use client'

import { useState, useEffect } from 'react'
import './globals.css'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

interface Task {
  id: string
  title: string
  description?: string
  status: string
}

interface TeamMember {
  id: string
  name: string
  email: string
  phone?: string
  role: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({ description: '', amount: '', category: 'food' })

  const API_BASE = 'http://localhost:3000'

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    try {
      setLoading(true)
      const [expRes, taskRes, teamRes] = await Promise.all([
        fetch(`${API_BASE}/api/expenses`).catch(() => ({ json: () => [] })),
        fetch(`${API_BASE}/api/tasks`).catch(() => ({ json: () => [] })),
        fetch(`${API_BASE}/api/team`).catch(() => ({ json: () => [] })),
      ])
      
      const expensesData = await expRes.json()
      const tasksData = await taskRes.json()
      const teamData = await teamRes.json()
      
      setExpenses(Array.isArray(expensesData) ? expensesData : [])
      setTasks(Array.isArray(tasksData) ? tasksData : [])
      setTeamMembers(Array.isArray(teamData) ? teamData : [])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: formData.description,
          amount: parseFloat(formData.amount),
          category: formData.category,
          date: new Date().toISOString().split('T')[0],
        }),
      })
      if (response.ok) {
        setMessage('✅ Despesa adicionada com sucesso!')
        setFormData({ description: '', amount: '', category: 'food' })
        await loadAllData()
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('❌ Erro ao adicionar despesa')
      }
    } catch (error) {
      setMessage('❌ Erro ao conectar com API')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('Tem certeza que quer deletar esta despesa?')) return
    try {
      setLoading(true)
      await fetch(`${API_BASE}/api/expenses/${id}`, { method: 'DELETE' })
      setMessage('✅ Despesa deletada com sucesso!')
      await loadAllData()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ Erro ao deletar despesa')
    } finally {
      setLoading(false)
    }
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0)
  const expensesByCategory = expenses.reduce((acc: any, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + (exp.amount || 0)
    return acc
  }, {})

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <header style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '40px 0', boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)' }}>
        <div className="container">
          <h1>💰 Casa Montenegro</h1>
          <p>Gerenciador de Despesas e Tarefas Domésticas</p>
          
          <nav style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
            {['dashboard', 'expenses', 'tasks', 'team', 'reports'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? 'active' : ''}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  background: activeTab === tab ? 'white' : 'rgba(255,255,255,0.2)',
                  color: activeTab === tab ? '#667eea' : 'white',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s',
                }}
              >
                {tab === 'dashboard' && '📊 Dashboard'}
                {tab === 'expenses' && '💸 Despesas'}
                {tab === 'tasks' && '✅ Tarefas'}
                {tab === 'team' && '👥 Equipe'}
                {tab === 'reports' && '📈 Relatórios'}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container">
        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <>
            <div className="grid">
              <div className="card">
                <div className="stat-number">R$ {totalExpenses.toFixed(2)}</div>
                <div className="stat-label">Total de Despesas</div>
              </div>
              <div className="card">
                <div className="stat-number" style={{ color: '#10b981' }}>{expenses.length}</div>
                <div className="stat-label">Despesas Registradas</div>
              </div>
              <div className="card">
                <div className="stat-number" style={{ color: '#f59e0b' }}>{tasks.filter(t => t.status === 'pending').length}</div>
                <div className="stat-label">Tarefas Pendentes</div>
              </div>
            </div>

            <div className="section">
              <h2>📊 Resumo por Categoria</h2>
              {Object.keys(expensesByCategory).length > 0 ? (
                <div style={{ display: 'grid', gap: '10px' }}>
                  {Object.entries(expensesByCategory).map(([category, amount]) => (
                    <div key={category} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                      <span style={{ color: '#333', fontWeight: 600 }}>{category}</span>
                      <span style={{ color: '#667eea', fontWeight: 'bold' }}>R$ {(amount as number).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  📭 Nenhuma despesa registrada ainda
                </div>
              )}
            </div>

            <div className="section">
              <h2>📝 Últimas Despesas</h2>
              {expenses.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Valor</th>
                      <th>Categoria</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.slice(0, 5).map((exp) => (
                      <tr key={exp.id}>
                        <td>{exp.description}</td>
                        <td style={{ fontWeight: 'bold', color: '#667eea' }}>R$ {exp.amount?.toFixed(2)}</td>
                        <td>{exp.category}</td>
                        <td>{new Date(exp.date).toLocaleDateString('pt-BR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  📭 Nenhuma despesa registrada
                </div>
              )}
            </div>
          </>
        )}

        {/* EXPENSES TAB */}
        {activeTab === 'expenses' && (
          <>
            <div className="section">
              <h2>➕ Adicionar Nova Despesa</h2>
              <form onSubmit={handleAddExpense}>
                <div className="form-group">
                  <label>Descrição</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Ex: Almoço, Gasolina, etc..."
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Valor (R$)</label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Categoria</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="food">🍽️ Alimentação</option>
                      <option value="transport">🚗 Transporte</option>
                      <option value="utilities">💡 Utilidades</option>
                      <option value="entertainment">🎮 Entretenimento</option>
                      <option value="other">📌 Outros</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? '⏳ Salvando...' : '✅ Adicionar Despesa'}
                </button>
              </form>
            </div>

            <div className="section">
              <h2>📝 Todas as Despesas</h2>
              {expenses.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Valor</th>
                      <th>Categoria</th>
                      <th>Data</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((exp) => (
                      <tr key={exp.id}>
                        <td>{exp.description}</td>
                        <td style={{ fontWeight: 'bold', color: '#667eea' }}>R$ {exp.amount?.toFixed(2)}</td>
                        <td>{exp.category}</td>
                        <td>{new Date(exp.date).toLocaleDateString('pt-BR')}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteExpense(exp.id)}
                            disabled={loading}
                            className="btn-danger"
                          >
                            🗑️ Deletar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  📭 Nenhuma despesa registrada
                </div>
              )}
            </div>
          </>
        )}

        {/* TASKS TAB */}
        {activeTab === 'tasks' && (
          <div className="section">
            <h2>✅ Tarefas Domésticas</h2>
            {tasks.length > 0 ? (
              <div style={{ display: 'grid', gap: '15px' }}>
                {tasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <div>
                      <div className="task-title">{task.title}</div>
                      {task.description && <div className="task-meta">{task.description}</div>}
                    </div>
                    <span className={`badge badge-${task.status === 'completed' ? 'success' : 'warning'}`}>
                      {task.status === 'completed' ? '✅ Concluída' : '⏳ Pendente'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                📭 Nenhuma tarefa registrada
              </div>
            )}
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === 'team' && (
          <div className="section">
            <h2>👥 Equipe da Casa</h2>
            {teamMembers.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Função</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id}>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.phone || '-'}</td>
                      <td><span className="badge badge-success">{member.role}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                📭 Nenhum membro registrado
              </div>
            )}
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <div className="section">
            <h2>📈 Relatórios</h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              <div style={{
                padding: '20px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                background: '#f9fafb',
              }}>
                <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Resumo Mensal</h3>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  Total de Despesas: <strong>R$ {totalExpenses.toFixed(2)}</strong>
                </p>
                <p style={{ color: '#666', marginBottom: '10px' }}>
                  Total de Registros: <strong>{expenses.length}</strong>
                </p>
                <p style={{ color: '#666' }}>
                  Tarefas Concluídas: <strong>{tasks.filter(t => t.status === 'completed').length}/{tasks.length}</strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>💰 Casa Montenegro © 2026 - Gerenciador de Despesas e Tarefas</p>
        <p className="subtitle">Sistema completo de gestão doméstica</p>
      </footer>
    </div>
  )
}
