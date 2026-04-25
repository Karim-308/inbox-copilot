import React, { useState } from 'react'
import { Card, Button, Badge } from '../components.jsx'

export default function Setup({ products, setProducts }) {
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', features: '', specs: '' })

  function startEdit(p) {
    setEditing(p.id)
    setAdding(false)
    setForm({ name: p.name, description: p.description, features: p.features, specs: p.specs })
  }

  function startAdd() {
    setAdding(true)
    setEditing(null)
    setForm({ name: '', description: '', features: '', specs: '' })
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

  const inputStyle = {
    width: '100%', padding: '8px 12px',
    border: '1px solid var(--border)', borderRadius: 'var(--radius)',
    fontSize: 13, color: 'var(--navy)', background: 'var(--surface)',
    outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.15s'
  }
  const labelStyle = { fontSize: 12, fontWeight: 500, color: 'var(--slate)', marginBottom: 4, display: 'block' }

  return (
    <div style={{ padding: '24px 32px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Product Knowledge Base</h1>
          <p style={{ fontSize: 14, color: 'var(--slate)' }}>
            The AI uses these products when matching client requirements. Edit, add, or remove products and the AI adapts immediately.
          </p>
        </div>
        <Button onClick={startAdd} variant="primary" size="md">
          + Add Product
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* ADD FORM */}
        {adding && (
          <Card style={{ padding: 20, borderColor: 'var(--blue-border)', borderWidth: 2 }} className="fade-up">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)', marginBottom: 16 }}>New Product</div>
            <FormFields form={form} setForm={setForm} inputStyle={inputStyle} labelStyle={labelStyle} />
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <Button onClick={save} variant="primary" size="sm">Save Product</Button>
              <Button onClick={() => setAdding(false)} variant="ghost" size="sm">Cancel</Button>
            </div>
          </Card>
        )}

        {products.map(p => (
          <Card key={p.id} style={{ padding: 20 }} className="fade-up">
            {editing === p.id ? (
              <>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)', marginBottom: 16 }}>Editing: {p.name}</div>
                <FormFields form={form} setForm={setForm} inputStyle={inputStyle} labelStyle={labelStyle} />
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <Button onClick={save} variant="primary" size="sm">Save Changes</Button>
                  <Button onClick={() => setEditing(null)} variant="ghost" size="sm">Cancel</Button>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--slate)', lineHeight: 1.55 }}>{p.description}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <Button onClick={() => startEdit(p)} variant="ghost" size="sm">Edit</Button>
                    <Button onClick={() => remove(p.id)} variant="ghost" size="sm" style={{ color: 'var(--red)' }}>Remove</Button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--muted)', marginBottom: 4 }}>Features</div>
                    <div style={{ fontSize: 12, color: 'var(--slate2)', lineHeight: 1.6 }}>{p.features}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--muted)', marginBottom: 4 }}>Specs</div>
                    <div style={{ fontSize: 12, color: 'var(--slate2)', lineHeight: 1.6 }}>{p.specs}</div>
                  </div>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>

      <div style={{
        marginTop: 24, padding: '14px 16px',
        background: 'var(--blue-bg)', border: '1px solid var(--blue-border)',
        borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--blue)'
      }}>
        <strong>How this works:</strong> When a client email arrives, the AI reads all {products.length} products above and matches the client's requirements against their features and specs. Richer descriptions lead to more accurate recommendations.
      </div>
    </div>
  )
}

function FormFields({ form, setForm, inputStyle, labelStyle }) {
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <label style={labelStyle}>Product Name *</label>
        <input style={inputStyle} value={form.name} onChange={set('name')} placeholder="e.g. Style Audio Guide" />
      </div>
      <div>
        <label style={labelStyle}>Description</label>
        <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} value={form.description} onChange={set('description')} placeholder="What is this product? Who is it for?" />
      </div>
      <div>
        <label style={labelStyle}>Key Features</label>
        <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} value={form.features} onChange={set('features')} placeholder="List main capabilities separated by commas" />
      </div>
      <div>
        <label style={labelStyle}>Technical Specs</label>
        <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} value={form.specs} onChange={set('specs')} placeholder="Battery life, storage, languages, triggering type, etc." />
      </div>
    </div>
  )
}
