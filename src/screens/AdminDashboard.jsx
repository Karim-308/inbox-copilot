import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, EnvelopeSimple, UserPlus, Clock, ChartLineUp, Pencil, Trash, Plus, FloppyDisk } from '@phosphor-icons/react'

const EMPTY_FORM = { name: '', description: '', features: '', specs: '' }

export default function AdminDashboard({ clients, products, setProducts }) {
  const [tab, setTab] = useState('metrics')

  return (
    <div className="p-8 max-w-6xl mx-auto h-full overflow-y-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sans font-bold text-primary mb-1">Dashboard</h1>
          <p className="text-sm font-mono text-muted">Agentic Copilot Performance & Knowledge Base</p>
        </div>
        <div className="flex gap-2 bg-surface border border-border rounded-md p-1">
          {['metrics', 'knowledge'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded text-sm font-sans font-medium transition-all ${tab === t ? 'bg-surface3 text-primary' : 'text-muted hover:text-primary'}`}
            >
              {t === 'metrics' ? 'Metrics' : 'Knowledge Base'}
            </button>
          ))}
        </div>
      </div>

      {tab === 'metrics' ? (
        <MetricsTab clients={clients} />
      ) : (
        <KnowledgeBaseTab products={products} setProducts={setProducts} />
      )}
    </div>
  )
}

function MetricsTab({ clients }) {
  const kpis = [
    { label: 'Emails Processed Today', value: '24', delta: '+6', icon: <EnvelopeSimple /> },
    { label: 'Replies Sent', value: '18', delta: '+3', icon: <CheckCircle /> },
    { label: 'New Leads Identified', value: '7', delta: '+2', icon: <UserPlus /> },
    { label: 'Avg. Response Time', value: '4 min', delta: '-2 min', icon: <Clock /> },
  ]

  const STATUS_COLORS = {
    new_inquiry: { dot: 'bg-accent-amber', label: 'New Inquiry' },
    demo_scheduled: { dot: 'bg-accent-blue', label: 'Demo Scheduled' },
    sent: { dot: 'bg-accent-green', label: 'Replied' },
    closed_won: { dot: 'bg-accent-green', label: 'Closed' },
    draft_ready: { dot: 'bg-accent-amber animate-pulse', label: 'Draft Ready' },
  }

  return (
    <>
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
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted font-mono mb-6">Recent Client Activity</h2>
          <div className="space-y-3">
            {clients.slice(0, 5).map((client, i) => {
              const s = STATUS_COLORS[client.status] || { dot: 'bg-border', label: client.status }
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-surface2 rounded border border-border">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                    <div className="min-w-0">
                      <div className="text-sm font-sans font-bold text-primary truncate">{client.name}</div>
                      <div className="text-[11px] text-muted truncate">{client.company}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
                    <div className="text-[10px] font-sans text-muted">{client.lastContact}</div>
                    <div className="text-[10px] font-mono text-primary/60">{s.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted font-mono mb-6">Open Inquiries</h2>
          <div className="space-y-3">
            {clients
              .filter(c => c.status === 'new_inquiry' || c.status === 'draft_ready' || c.status === 'demo_scheduled')
              .slice(0, 5)
              .map((client, i) => {
                const s = STATUS_COLORS[client.status] || { dot: 'bg-border', label: client.status }
                return (
                  <div key={i} className="p-3 bg-surface2 rounded border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-sans font-bold text-primary">{client.name}</div>
                      <div className={`flex items-center gap-1.5 text-[10px] font-mono`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        <span className="text-muted">{s.label}</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-muted truncate">{client.lastSubject}</div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

function KnowledgeBaseTab({ products, setProducts }) {
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  function startEdit(p) {
    setEditing(p.id)
    setAdding(false)
    setForm({ name: p.name, description: p.description, features: p.features, specs: p.specs })
  }

  function startAdd() {
    setAdding(true)
    setEditing(null)
    setForm(EMPTY_FORM)
  }

  function save() {
    if (!form.name.trim()) return
    if (adding) {
      setProducts(prev => [...prev, { id: Date.now().toString(), ...form }])
      setAdding(false)
    } else {
      setProducts(prev => prev.map(p => p.id === editing ? { ...p, ...form } : p))
      setEditing(null)
    }
  }

  function remove(id) {
    if (confirm('Remove this product from the knowledge base?')) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-mono text-muted">
            {products.length} documents indexed · RAG retrieval active
          </p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-3 py-1.5 bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-xs font-sans font-medium rounded hover:bg-accent-blue/20 transition-colors"
        >
          <Plus weight="bold" size={12} /> Add Product
        </button>
      </div>

      <div className="space-y-3">
        {adding && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border-2 border-accent-blue/40 rounded-lg p-5"
          >
            <div className="text-xs font-mono text-accent-blue mb-4 uppercase tracking-widest">New Document</div>
            <ProductForm form={form} setForm={setForm} />
            <div className="flex gap-2 mt-4">
              <button onClick={save} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-blue text-white text-xs font-sans font-medium rounded hover:bg-blue-600 transition-colors">
                <FloppyDisk weight="bold" size={12} /> Save
              </button>
              <button onClick={() => setAdding(false)} className="px-3 py-1.5 text-muted text-xs font-sans hover:text-primary transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {products.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-surface border border-border rounded-lg p-5"
          >
            {editing === p.id ? (
              <>
                <div className="text-xs font-mono text-accent-blue mb-4 uppercase tracking-widest">Editing: {p.name}</div>
                <ProductForm form={form} setForm={setForm} />
                <div className="flex gap-2 mt-4">
                  <button onClick={save} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-blue text-white text-xs font-sans font-medium rounded hover:bg-blue-600 transition-colors">
                    <FloppyDisk weight="bold" size={12} /> Save
                  </button>
                  <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-muted text-xs font-sans hover:text-primary transition-colors">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-green mt-1.5 shrink-0" />
                    <div>
                      <div className="text-sm font-sans font-bold text-primary">{p.name}</div>
                      <div className="text-xs font-sans text-muted mt-0.5">{p.description}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 ml-4">
                    <button onClick={() => startEdit(p)} className="p-1.5 text-muted hover:text-primary transition-colors rounded hover:bg-surface2">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => remove(p.id)} className="p-1.5 text-muted hover:text-red-400 transition-colors rounded hover:bg-surface2">
                      <Trash size={13} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 ml-5 pl-0">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted mb-1.5">Features</div>
                    <div className="text-xs font-sans text-primary/80 leading-relaxed">{p.features}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted mb-1.5">Specs</div>
                    <div className="text-xs font-sans text-primary/80 leading-relaxed">{p.specs}</div>
                  </div>
                </div>
                <div className="mt-3 ml-5 flex gap-2 flex-wrap">
                  {p.features.split(',').slice(0, 4).map((f, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-surface2 border border-border rounded text-muted">
                      {f.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ProductForm({ form, setForm }) {
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const cls = "w-full bg-surface2 border border-border rounded px-3 py-2 text-sm font-sans text-primary focus:outline-none focus:border-accent-blue transition-colors"
  return (
    <div className="space-y-3">
      <div>
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted mb-1.5 block">Product Name *</label>
        <input className={cls} value={form.name} onChange={set('name')} placeholder="e.g. Style Audio Guide" />
      </div>
      <div>
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted mb-1.5 block">Description</label>
        <textarea className={`${cls} resize-none`} rows={2} value={form.description} onChange={set('description')} placeholder="What is this product and who is it for?" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted mb-1.5 block">Key Features</label>
          <textarea className={`${cls} resize-none`} rows={3} value={form.features} onChange={set('features')} placeholder="Comma-separated features" />
        </div>
        <div>
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted mb-1.5 block">Technical Specs</label>
          <textarea className={`${cls} resize-none`} rows={3} value={form.specs} onChange={set('specs')} placeholder="Battery, storage, languages, etc." />
        </div>
      </div>
    </div>
  )
}
