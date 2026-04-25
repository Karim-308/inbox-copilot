import React from 'react'
import { Card, Avatar, Button, StatusBadge, Tag, ConfBar, Section } from '../components.jsx'

export default function ClientRecord({ client, onBack, onProcessEmail }) {
  if (!client) return null

  return (
    <div style={{ padding: '24px 32px', maxWidth: 900, margin: '0 auto' }}>
      <button onClick={onBack} style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'none', border: 'none', color: 'var(--slate)',
        fontSize: 13, cursor: 'pointer', marginBottom: 20, padding: 0
      }}>
        ← Back to Pipeline
      </button>

      {/* CLIENT HEADER */}
      <Card style={{ padding: 24, marginBottom: 16 }} className="fade-up">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
          <Avatar initials={client.avatar} color={client.avatarColor} size={48} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>{client.name}</div>
              <StatusBadge status={client.status} />
            </div>
            <div style={{ fontSize: 14, color: 'var(--slate)', marginBottom: 2 }}>{client.company}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{client.email} · {client.country}</div>
          </div>
          <Button onClick={onProcessEmail} variant="primary" size="md">
            ⚡ Process New Email
          </Button>
        </div>

        {/* QUICK STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.7px' }}>Interactions</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>{client.interactions.length}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.7px' }}>Last Contact</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--navy)' }}>{client.lastContact}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.7px' }}>Pipeline Stage</div>
            <StatusBadge status={client.status} />
          </div>
        </div>
      </Card>

      {/* CRM SYNC INDICATOR */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--green-bg)', border: '1px solid var(--green-border)',
        borderRadius: 'var(--radius)', padding: '10px 16px', marginBottom: 16
      }} className="fade-up-2">
        <div style={{ width: 8, height: 8, background: 'var(--green)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)' }}>HubSpot CRM — Synced</div>
        <div style={{ fontSize: 12, color: 'var(--slate2)', marginLeft: 4 }}>
          Contact, deal, and all interactions are logged. Last sync: just now.
        </div>
      </div>

      {/* INTERACTION TIMELINE */}
      <div className="fade-up-3">
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>
          Interaction History
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {client.interactions.map((interaction, i) => (
            <Card key={interaction.id} style={{ padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <div style={{
                      fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
                      background: interaction.type === 'inbound' ? 'var(--blue-bg)' : 'var(--surface2)',
                      color: interaction.type === 'inbound' ? 'var(--blue)' : 'var(--slate)',
                      border: `1px solid ${interaction.type === 'inbound' ? 'var(--blue-border)' : 'var(--border)'}`
                    }}>
                      {interaction.type === 'inbound' ? '↓ Inbound' : '↑ Outbound'}
                    </div>
                    {interaction.classification && <StatusBadge status={interaction.classification} />}
                    {interaction.status && <StatusBadge status={interaction.status} />}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 3 }}>{interaction.subject}</div>
                  <div style={{ fontSize: 12, color: 'var(--slate)', lineHeight: 1.55 }}>{interaction.summary}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{interaction.date}</div>
              </div>

              {interaction.confidence !== null && interaction.confidence !== undefined && (
                <div style={{ paddingTop: 10, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 160 }}>
                    <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>Confidence</span>
                    <ConfBar value={interaction.confidence} />
                  </div>
                  {interaction.recommendation && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>Recommendation</span>
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        background: 'var(--green-bg)', color: 'var(--green)',
                        border: '1px solid var(--green-border)',
                        padding: '2px 8px', borderRadius: 4
                      }}>
                        {interaction.recommendation}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
