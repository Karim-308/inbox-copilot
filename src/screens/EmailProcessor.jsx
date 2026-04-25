import React, { useState } from 'react'
import { Card, Button, Badge, Tag, ConfBar, Section, StatusBadge, Avatar } from '../components.jsx'
import { SAMPLE_EMAILS, MOCK_RESPONSES } from '../data.js'

const STEPS = [
  { id: 'classify', label: 'Classifying Intent', icon: '🏷', sub: 'Reading email type and signals' },
  { id: 'extract', label: 'Extracting Requirements', icon: '📋', sub: 'Parsing technical specs' },
  { id: 'match', label: 'Searching Knowledge Base', icon: '🔍', sub: 'RAG retrieval across products' },
  { id: 'compose', label: 'Composing + Self-Checking', icon: '✍', sub: 'Drafting and verifying accuracy' },
]


export default function EmailProcessor({ products, clients, onEmailProcessed }) {
  const [email, setEmail] = useState('')
  const [fromInfo, setFromInfo] = useState('')
  const [subject, setSubject] = useState('')
  const [processing, setProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(null)
  const [doneSteps, setDoneSteps] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  function loadSample(s) {
    setEmail(s.body)
    setFromInfo(s.from)
    setSubject(s.subject)
    setResult(null)
    setError(null)
    setSent(false)
    setDoneSteps([])
    setCurrentStep(null)
  }

  async function analyze() {
    if (!email.trim()) return
    setProcessing(true)
    setResult(null)
    setError(null)
    setSent(false)
    setDoneSteps([])

    const delays = [900, 1100, 1300, 1100]

    for (let i = 0; i < STEPS.length - 1; i++) {
      setCurrentStep(STEPS[i].id)
      await sleep(delays[i])
      setDoneSteps(d => [...d, STEPS[i].id])
    }
    setCurrentStep(STEPS[3].id)

    try {
      await sleep(delays[3])
      const idx = SAMPLE_EMAILS.findIndex(s => email.trim() === s.body.trim())
      const mock = idx !== -1 ? MOCK_RESPONSES[idx] : MOCK_RESPONSES[0]
      setDoneSteps(d => [...d, STEPS[3].id])
      setCurrentStep(null)
      setResult(mock)
    } catch (e) {
      setError(e.message)
    } finally {
      setProcessing(false)
    }
  }

  function handleSend() {
    if (!result) return
    setSent(true)
    onEmailProcessed({
      from: fromInfo,
      subject,
      result,
    })
  }

  function reset() {
    setEmail('')
    setFromInfo('')
    setSubject('')
    setResult(null)
    setError(null)
    setSent(false)
    setDoneSteps([])
    setCurrentStep(null)
  }

  return (
    <div style={{ padding: '24px 32px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>Email Processor</h1>
        <p style={{ fontSize: 14, color: 'var(--slate)' }}>Paste a client email and let the AI analyze it using your product knowledge base.</p>
      </div>

      {/* SAMPLE EMAILS */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', alignSelf: 'center', marginRight: 4 }}>Load sample:</span>
        {SAMPLE_EMAILS.map((s, i) => (
          <button key={i} onClick={() => loadSample(s)} style={{
            padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: 500,
            background: 'var(--surface)', border: '1px solid var(--border)',
            color: 'var(--slate)', cursor: 'pointer', transition: 'all 0.15s'
          }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--blue)'; e.target.style.color = 'var(--blue)' }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--slate)' }}>
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* LEFT — EMAIL INPUT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card style={{ padding: 20, flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--muted)', marginBottom: 14 }}>
              Client Email
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
              <input
                value={fromInfo}
                onChange={e => setFromInfo(e.target.value)}
                placeholder="From: name@company.com"
                style={inputSt}
              />
              <input
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Subject"
                style={inputSt}
              />
              <textarea
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Paste or type the client email here..."
                style={{ ...inputSt, resize: 'vertical', minHeight: 280, fontFamily: 'inherit', lineHeight: 1.65 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                onClick={analyze}
                variant="primary"
                size="md"
                disabled={!email.trim() || processing}
                loading={processing}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {processing ? 'Analyzing...' : '⚡ Analyze with AI'}
              </Button>
              {(result || error) && (
                <Button onClick={reset} variant="ghost" size="md">Reset</Button>
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT — AI PIPELINE + RESULTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* PIPELINE STEPS */}
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--muted)', marginBottom: 14 }}>
              AI Pipeline
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STEPS.map(step => {
                const isDone = doneSteps.includes(step.id)
                const isActive = currentStep === step.id
                return (
                  <div key={step.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 'var(--radius)',
                    border: `1px solid ${isDone ? 'var(--green-border)' : isActive ? 'var(--blue-border)' : 'var(--border)'}`,
                    background: isDone ? 'var(--green-bg)' : isActive ? 'var(--blue-bg)' : 'var(--surface2)',
                    opacity: (!isActive && !isDone && processing) ? 0.4 : 1,
                    transition: 'all 0.3s'
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isDone ? 'var(--green)' : isActive ? 'var(--blue)' : 'var(--border)',
                      fontSize: 12, transition: 'background 0.3s'
                    }}>
                      {isDone ? <span style={{ color: '#fff', fontWeight: 700 }}>✓</span> :
                       isActive ? <span className="spinner-sm" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} /> :
                       <span style={{ fontSize: 13 }}>{step.icon}</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: isDone ? 'var(--green)' : isActive ? 'var(--blue)' : 'var(--slate)' }}>
                        {step.label}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{step.sub}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* ERROR */}
          {error && (
            <Card style={{ padding: 16, borderColor: 'var(--red-border)', background: 'var(--red-bg)' }}>
              <div style={{ fontSize: 13, color: 'var(--red)', fontWeight: 600 }}>Error</div>
              <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 4 }}>{error}</div>
            </Card>
          )}

          {/* RESULTS */}
          {result && !sent && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Card style={{ padding: 18 }} className="fade-up">
                <Section label="Classification">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <StatusBadge status={result.classification} />
                    <ConfBar value={result.confidence} />
                  </div>
                  {result.client_name && (
                    <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 6 }}>
                      <strong>{result.client_name}</strong> · {result.client_company}
                    </div>
                  )}
                </Section>
              </Card>

              <Card style={{ padding: 18 }} className="fade-up-2">
                <Section label="Extracted Requirements">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 2 }}>
                    {(result.requirements || []).map((r, i) => <Tag key={i}>{r}</Tag>)}
                  </div>
                </Section>
              </Card>

              {result.recommended_product && (
                <Card style={{ padding: 18, borderLeft: '3px solid var(--green)' }} className="fade-up-3">
                  <Section label="Recommended Product">
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>
                      {result.recommended_product}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--slate)', lineHeight: 1.6, marginBottom: 8 }}>
                      {result.recommendation_reason}
                    </div>
                    {(result.exclusions || []).length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {result.exclusions.map((e, i) => (
                          <div key={i} style={{ fontSize: 11, color: 'var(--red)', display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                            <span>✕</span> <span>{e}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Section>
                </Card>
              )}

              <Card style={{ padding: 18 }} className="fade-up-4">
                <Section label="Draft Reply">
                  <div style={{
                    fontSize: 12, lineHeight: 1.75, color: 'var(--navy2)',
                    whiteSpace: 'pre-wrap', background: 'var(--surface2)',
                    padding: 12, borderRadius: 6, border: '1px solid var(--border)',
                    maxHeight: 180, overflowY: 'auto'
                  }}>
                    {result.draft_reply}
                  </div>
                </Section>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <Button onClick={handleSend} variant="success" size="md" style={{ flex: 1, justifyContent: 'center' }}>
                    Send Reply
                  </Button>
                  <Button variant="secondary" size="md">Edit</Button>
                  <Button variant="ghost" size="md">Skip</Button>
                </div>
              </Card>
            </div>
          )}

          {/* SENT SUCCESS */}
          {sent && (
            <Card style={{ padding: 24, textAlign: 'center' }} className="fade-up">
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'var(--green-bg)', border: '1px solid var(--green-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, margin: '0 auto 12px'
              }}>✓</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--green)', marginBottom: 14 }}>Reply Sent</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                {[
                  'Reply sent to client',
                  'Client record created/updated',
                  'Interaction logged to timeline',
                  'HubSpot CRM synced'
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'var(--green-bg)', borderRadius: 6,
                    padding: '7px 12px', fontSize: 12, color: '#065F46', fontWeight: 500
                  }}>
                    <span>✓</span> {item}
                  </div>
                ))}
              </div>
              <Button onClick={reset} variant="secondary" size="md">Process Another Email</Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

const inputSt = {
  width: '100%', padding: '8px 12px',
  border: '1px solid var(--border)', borderRadius: 'var(--radius)',
  fontSize: 13, color: 'var(--navy)', background: 'var(--surface)',
  outline: 'none', fontFamily: 'inherit'
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }
