import React, { useState, useEffect } from 'react'
import Setup from './screens/Setup.jsx'
import Dashboard from './screens/Dashboard.jsx'
import EmailProcessor from './screens/EmailProcessor.jsx'
import ClientRecord from './screens/ClientRecord.jsx'
import { DEFAULT_PRODUCTS, DEFAULT_CLIENTS } from './data.js'
import { Avatar } from './components.jsx'

const NAV = [
  { id: 'dashboard', label: 'Pipeline', icon: '📊' },
  { id: 'processor', label: 'Process Email', icon: '⚡' },
  { id: 'setup', label: 'Products', icon: '📦' },
]

function useLocalStorage(key, defaultVal) {
  const [val, setVal] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultVal
    } catch { return defaultVal }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
  }, [key, val])
  return [val, setVal]
}

export default function App() {
  const [products, setProducts] = useLocalStorage('isc_products', DEFAULT_PRODUCTS)
  const [clients, setClients] = useLocalStorage('isc_clients', DEFAULT_CLIENTS)
  const [screen, setScreen] = useState('dashboard')
  const [viewingClientId, setViewingClientId] = useState(null)

  function handleViewClient(id) {
    setViewingClientId(id)
    setScreen('client')
  }

  function handleEmailProcessed({ from, subject, result }) {
    const now = new Date()
    const timeStr = 'Just now'

    // Try to find existing client by email
    const emailMatch = from.match(/<(.+?)>/) || []
    const emailAddr = emailMatch[1] || from

    const newInteraction = {
      id: `i_${Date.now()}`,
      date: timeStr,
      type: 'inbound',
      subject: subject || 'Processed Email',
      summary: result.requirements?.join(', ') || 'Email processed by AI.',
      classification: result.classification,
      confidence: result.confidence,
      recommendation: result.recommended_product || null,
      status: 'sent'
    }

    setClients(prev => {
      const existing = prev.find(c => c.email === emailAddr)
      if (existing) {
        return prev.map(c => c.email === emailAddr ? {
          ...c,
          status: 'sent',
          lastSubject: subject || 'Processed Email',
          lastContact: 'Just now',
          interactions: [newInteraction, ...c.interactions]
        } : c)
      } else {
        const newClient = {
          id: `c_${Date.now()}`,
          name: result.client_name || 'Unknown Client',
          company: result.client_company || 'Unknown Company',
          email: emailAddr,
          country: '',
          status: 'sent',
          lastSubject: subject || 'Processed Email',
          lastContact: 'Just now',
          avatar: (result.client_name || 'UC').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
          avatarColor: '#' + Math.floor(Math.random() * 0xAAAAAA + 0x555555).toString(16),
          interactions: [newInteraction]
        }
        return [newClient, ...prev]
      }
    })

    setScreen('dashboard')
  }

  const viewingClient = clients.find(c => c.id === viewingClientId)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* TOP NAVIGATION */}
      <header style={{
        background: 'var(--navy)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center',
          padding: '0 32px', height: 56
        }}>
          {/* LOGO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 40 }}>
            <div style={{
              width: 30, height: 30, background: 'var(--blue)',
              borderRadius: 8, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 15
            }}>⚡</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Inbox Sales Copilot</div>
              <div style={{ fontSize: 10, color: '#475569', marginTop: 1 }}>Look2Innovate Demo</div>
            </div>
          </div>

          {/* NAV LINKS */}
          <nav style={{ display: 'flex', gap: 4 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setScreen(n.id)} style={{
                padding: '6px 14px', borderRadius: 6,
                background: screen === n.id ? 'rgba(37,99,235,0.2)' : 'transparent',
                border: screen === n.id ? '1px solid rgba(37,99,235,0.3)' : '1px solid transparent',
                color: screen === n.id ? '#93C5FD' : '#94A3B8',
                fontSize: 13, fontWeight: screen === n.id ? 600 : 400,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.15s', fontFamily: 'inherit'
              }}>
                <span>{n.icon}</span> {n.label}
              </button>
            ))}
          </nav>

          {/* USER */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0' }}>Mina Nagy</div>
              <div style={{ fontSize: 11, color: '#475569' }}>Sales Engineer</div>
            </div>
            <Avatar initials="MN" color="#2563EB" size={32} />
          </div>
        </div>
      </header>

      {/* SCREEN CONTENT */}
      <main style={{ flex: 1 }}>
        {screen === 'dashboard' && (
          <Dashboard
            clients={clients}
            onProcessEmail={() => setScreen('processor')}
            onViewClient={handleViewClient}
          />
        )}
        {screen === 'processor' && (
          <EmailProcessor
            products={products}
            clients={clients}
            onEmailProcessed={handleEmailProcessed}
          />
        )}
        {screen === 'setup' && (
          <Setup products={products} setProducts={setProducts} />
        )}
        {screen === 'client' && (
          <ClientRecord
            client={viewingClient}
            onBack={() => setScreen('dashboard')}
            onProcessEmail={() => setScreen('processor')}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '12px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--surface)', fontSize: 12, color: 'var(--muted)'
      }}>
        <span>Inbox Sales Copilot · ITI Capstone · Team 2 · Intake 46</span>
        <span>Karim Ibrahim, Mohamed Nagy, Mohamed Khaled, Rana Mohamed, Salma Yaser, Abdulrahman Ibrahim</span>
      </footer>
    </div>
  )
}
