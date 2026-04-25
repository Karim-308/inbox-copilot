import React from 'react'
import { Card, Avatar, StatusBadge, Button } from '../components.jsx'

const STATUS_ORDER = ['new_inquiry', 'draft_ready', 'demo_scheduled', 'sent', 'closed_won']

export default function Dashboard({ clients, onProcessEmail, onViewClient }) {
  const stats = [
    {
      label: 'Emails Processed',
      value: clients.reduce((acc, c) => acc + c.interactions.length, 0),
      sub: 'across all clients',
      color: 'var(--blue)'
    },
    {
      label: 'Draft Ready',
      value: clients.filter(c => c.status === 'draft_ready').length,
      sub: 'awaiting engineer review',
      color: 'var(--purple)'
    },
    {
      label: 'Active Clients',
      value: clients.filter(c => !['closed_won'].includes(c.status)).length,
      sub: 'in pipeline',
      color: 'var(--green)'
    },
    {
      label: 'Avg Response Time',
      value: '< 30s',
      sub: 'AI draft generation',
      color: 'var(--amber)'
    }
  ]

  return (
    <div style={{ padding: '24px 32px', maxWidth: 1100, margin: '0 auto' }}>
      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>Client Pipeline</h1>
        <p style={{ fontSize: 14, color: 'var(--slate)' }}>All inbound client communications, AI-processed and tracked.</p>
      </div>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <Card key={i} style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* PROCESS NEW EMAIL BUTTON */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 14
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>
          All Clients ({clients.length})
        </div>
        <Button onClick={onProcessEmail} variant="primary" size="md">
          ⚡ Process New Email
        </Button>
      </div>

      {/* CLIENT TABLE */}
      <Card style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
              {['Client', 'Company', 'Last Email', 'Status', 'Last Contact', 'Actions'].map(h => (
                <th key={h} style={{
                  padding: '10px 16px', textAlign: 'left',
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.7px', color: 'var(--muted)'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients.map((c, i) => (
              <tr
                key={c.id}
                style={{
                  borderBottom: i < clients.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.1s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar initials={c.avatar} color={c.avatarColor} size={32} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontSize: 13, color: 'var(--navy)' }}>{c.company}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{c.country}</div>
                </td>
                <td style={{ padding: '12px 16px', maxWidth: 240 }}>
                  <div style={{ fontSize: 12, color: 'var(--slate)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.lastSubject}
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <StatusBadge status={c.status} />
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{c.lastContact}</div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Button onClick={() => onViewClient(c.id)} variant="ghost" size="sm">View</Button>
                    {(c.status === 'new_inquiry' || c.status === 'draft_ready') && (
                      <Button onClick={onProcessEmail} variant="secondary" size="sm">
                        ⚡ Process
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
