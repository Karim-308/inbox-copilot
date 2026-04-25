import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Database, ChartLineUp, ShieldCheck } from '@phosphor-icons/react'

export default function AdminDashboard({ clients }) {
  const kpis = [
    { label: 'Avg Generation Time', value: '1.2s', delta: '-12%', icon: <ChartLineUp /> },
    { label: 'RAG Hit Rate', value: '98.5%', delta: '+2.1%', icon: <Database /> },
    { label: 'Hallucination Rate', value: '0.01%', delta: '-0.05%', icon: <ShieldCheck /> },
    { label: 'Auto-Replies Sent', value: '142', delta: '+14', icon: <CheckCircle /> }
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-sans font-bold text-primary mb-2">Metrics & Admin</h1>
        <p className="text-sm font-mono text-muted">Agentic Copilot Performance Dashboard</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-surface border border-border rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="text-muted text-xl">{kpi.icon}</div>
              <div className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${kpi.delta.startsWith('+') ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-blue/10 text-accent-blue'}`}>
                {kpi.delta}
              </div>
            </div>
            <div className="text-2xl font-sans font-bold text-primary mb-1">{kpi.value}</div>
            <div className="text-xs font-sans text-muted">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted font-mono mb-6">CRM Synchronization Sync Queue</h2>
          
          <div className="space-y-4">
            {clients.slice(0, 4).map((client, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-surface2 rounded border border-border">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-accent-amber animate-pulse' : 'bg-accent-green'}`} />
                  <div>
                    <div className="text-sm font-sans font-bold text-primary">{client.company}</div>
                    <div className="text-[10px] font-mono text-muted">Ticket: {client.lastSubject.substring(0, 20)}...</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-muted">
                  {i === 0 ? 'Syncing...' : 'Synced'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted font-mono mb-6">RAG Confidence Logs</h2>
          
          <div className="space-y-4">
            {[98, 92, 88, 95].map((conf, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-muted">
                  <span>Query #{8432 - i}</span>
                  <span className={conf > 90 ? 'text-accent-green' : 'text-accent-amber'}>{conf}% Conf</span>
                </div>
                <div className="h-1.5 bg-surface2 rounded-full overflow-hidden flex">
                  <div className="h-full bg-accent-blue" style={{ width: '40%' }} />
                  <div className="h-full bg-accent-green" style={{ width: `${conf - 40}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
