import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Casa Montenegro - Gerenciador de Despesas',
  description: 'Sistema completo de gerenciamento de despesas e tarefas domésticas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
