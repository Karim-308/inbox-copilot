import React from 'react'

export function Badge({ children, color = 'blue' }) {
  const colors = {
    blue: { bg: 'var(--blue-bg)', border: 'var(--blue-border)', text: 'var(--blue)' },
    green: { bg: 'var(--green-bg)', border: 'var(--green-border)', text: 'var(--green)' },
    amber: { bg: 'var(--amber-bg)', border: 'var(--amber-border)', text: 'var(--amber)' },
    red: { bg: 'var(--red-bg)', border: 'var(--red-border)', text: 'var(--red)' },
    purple: { bg: 'var(--purple-bg)', border: 'var(--purple-border)', text: 'var(--purple)' },
    gray: { bg: 'var(--surface2)', border: 'var(--border)', text: 'var(--slate)' },
  }
  const c = colors[color] || colors.blue
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 100,
      whiteSpace: 'nowrap'
    }}>
      {children}
    </span>
  )
}

export function Card({ children, style = {}, className = '' }) {
  return (
    <div className={className} style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow)',
      ...style
    }}>
      {children}
    </div>
  )
}

export function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, loading = false, style = {} }) {
  const variants = {
    primary: { background: 'var(--blue)', color: '#fff', border: 'none' },
    secondary: { background: 'var(--surface)', color: 'var(--navy)', border: '1px solid var(--border)' },
    ghost: { background: 'transparent', color: 'var(--slate)', border: '1px solid var(--border)' },
    danger: { background: 'var(--red)', color: '#fff', border: 'none' },
    success: { background: 'var(--green)', color: '#fff', border: 'none' },
  }
  const sizes = {
    sm: { padding: '6px 12px', fontSize: 12 },
    md: { padding: '8px 16px', fontSize: 13 },
    lg: { padding: '11px 22px', fontSize: 14 },
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        borderRadius: 'var(--radius)', fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1, transition: 'opacity 0.15s, transform 0.1s',
        ...variants[variant], ...sizes[size], ...style
      }}
    >
      {loading && <span className="spinner-sm" />}
      {children}
    </button>
  )
}

export function Avatar({ initials, color, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color || 'var(--blue)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 600, fontSize: size * 0.38,
      flexShrink: 0, userSelect: 'none'
    }}>
      {initials}
    </div>
  )
}

export function StatusBadge({ status }) {
  const map = {
    new_inquiry: { label: 'New Inquiry', color: 'blue' },
    draft_ready: { label: 'Draft Ready', color: 'purple' },
    sent: { label: 'Sent', color: 'green' },
    demo_scheduled: { label: 'Demo Scheduled', color: 'amber' },
    closed_won: { label: 'Closed Won', color: 'green' },
    forwarded: { label: 'Forwarded', color: 'gray' },
    product_inquiry: { label: 'Product Inquiry', color: 'blue' },
    demo_request: { label: 'Demo Request', color: 'amber' },
    support: { label: 'Support', color: 'red' },
    follow_up: { label: 'Follow-up', color: 'purple' },
    sensitive: { label: 'Sensitive', color: 'red' },
  }
  const s = map[status] || { label: status, color: 'gray' }
  return <Badge color={s.color}>{s.label}</Badge>
}

export function Tag({ children }) {
  return (
    <span style={{
      display: 'inline-block',
      background: 'var(--surface2)',
      border: '1px solid var(--border)',
      borderRadius: 4, padding: '2px 8px',
      fontSize: 11, color: 'var(--navy2)',
      fontWeight: 500
    }}>
      {children}
    </span>
  )
}

export function Section({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)' }}>
        {label}
      </div>
      {children}
    </div>
  )
}

export function ConfBar({ value }) {
  const color = value >= 85 ? 'var(--green)' : value >= 60 ? 'var(--amber)' : 'var(--red)'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: 'var(--border)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 10, transition: 'width 1s ease' }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 32 }}>{value}%</span>
    </div>
  )
}
