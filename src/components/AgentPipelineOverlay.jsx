import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const AGENTS = [
  { id: 'classifier', label: 'Intent Classifier', desc: 'Analyzing semantics & urgency' },
  { id: 'extractor', label: 'Spec Extractor', desc: 'Parsing technical constraints' },
  { id: 'matcher', label: 'RAG Matcher', desc: 'Querying vector database' },
  { id: 'composer', label: 'Draft Composer', desc: 'Generating contextual reply' },
  { id: 'supervisor', label: 'Quality Supervisor', desc: 'Verifying hallucination & tone' },
]

export default function AgentPipelineOverlay({ onComplete }) {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current++
      if (current >= AGENTS.length) {
        clearInterval(interval)
        setTimeout(() => onComplete(), 500)
      } else {
        setActiveIdx(current)
      }
    }, 1200) // 1.2s per agent to create tension and "wow" factor

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="w-[600px] bg-surface border border-border rounded-lg shadow-2xl overflow-hidden font-mono">
        <div className="flex items-center px-4 py-2 border-b border-border bg-surface2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-border" />
            <div className="w-3 h-3 rounded-full bg-border" />
            <div className="w-3 h-3 rounded-full bg-accent-blue" />
          </div>
          <div className="ml-4 text-xs text-muted uppercase tracking-widest font-bold">
            Agentic Processing Pipeline // Active
          </div>
        </div>
        
        <div className="p-8 pb-10">
          <div className="space-y-6 relative">
            {/* Connecting line */}
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border z-0" />
            
            {AGENTS.map((agent, idx) => {
              const status = idx < activeIdx ? 'done' : idx === activeIdx ? 'active' : 'pending'
              
              return (
                <div key={agent.id} className="relative z-10 flex gap-6 items-center">
                  {/* Status Indicator */}
                  <div className={`w-8 h-8 flex items-center justify-center rounded bg-surface border shrink-0 transition-colors duration-300 ${
                    status === 'done' ? 'border-accent-green text-accent-green' : 
                    status === 'active' ? 'border-accent-blue text-accent-blue shadow-glow-blue' : 
                    'border-border text-muted'
                  }`}>
                    {status === 'done' ? (
                      <span className="text-sm font-bold">✓</span>
                    ) : status === 'active' ? (
                      <span className="text-sm font-bold animate-pulse-fast">●</span>
                    ) : (
                      <span className="text-xs">○</span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className={`flex-1 transition-opacity duration-300 ${status === 'pending' ? 'opacity-40' : 'opacity-100'}`}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="text-sm font-bold text-primary">{agent.label}</div>
                      <div className="text-[10px] text-muted uppercase tracking-widest">
                        {status === 'done' ? '24ms' : status === 'active' ? 'processing...' : 'waiting'}
                      </div>
                    </div>
                    <div className="text-xs text-muted">{agent.desc}</div>
                    
                    {/* Simulated terminal output for active step */}
                    {status === 'active' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 p-2 bg-surface2 border border-border rounded text-[10px] text-accent-blue font-mono whitespace-pre-wrap overflow-hidden"
                      >
                        {idx === 0 && "> Extracting text embeddings...\n> Matching local context window..."}
                        {idx === 1 && "> NLP sweep for entities...\n> Found: [50 players, outdoor, RJ45, PoE]"}
                        {idx === 2 && "> Vector similarity search (k=3)...\n> Look2Innovate DPA-4 found (score: 0.94)"}
                        {idx === 3 && "> Injecting RAG context...\n> Generating personalized response..."}
                        {idx === 4 && "> Cross-referencing technical specs...\n> No hallucinations detected. Passing."}
                        <span className="cursor-blink ml-1 block mt-1 w-2 h-3 bg-accent-blue" />
                      </motion.div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
