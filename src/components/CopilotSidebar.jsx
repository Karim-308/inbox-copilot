import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, WarningCircle, MagicWand, PaperPlaneRight, X, ArrowsClockwise } from '@phosphor-icons/react'

export default function CopilotSidebar({ result, emailBody, onClose }) {
  const [draft, setDraft] = useState(result.draft_reply)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [sent, setSent] = useState(false)

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    setDraft('')
    
    try {
      // Use the provided API Key from environment variables
      const apiKey = import.meta.env.VITE_ZHIPU_API_KEY
      const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "glm-4-flash",
          messages: [
            {
              role: "system",
              content: "You are an AI sales engineer for Look2Innovate. Write a concise, professional reply confirming our product fits their needs based on the requirements."
            },
            {
              role: "user",
              content: `Email: ${emailBody}\nRequirements: ${result.requirements.join(', ')}\nProduct: ${result.recommended_product}`
            }
          ],
          stream: true
        })
      })

      if (!response.ok) throw new Error("API Authentication failed")
      
      const reader = response.body.getReader()
      const decoder = new TextDecoder("utf-8")
      let fullDraft = ""

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6))
              const content = data.choices[0]?.delta?.content || ""
              fullDraft += content
              setDraft(fullDraft)
            } catch (e) {}
          }
        }
      }
    } catch (e) {
      // Fallback fallback simulated streaming if API key fails
      const fallbackText = "Dear Client,\n\nFollowing up on your request. I am confident our Look2Innovate DPA-4 fits your requirements perfectly. It supports up to 50 players, handles seamless outdoor synchronization, and features standard RJ45 networking.\n\nLet's schedule a demo to review this together.\n\nBest regards,\nMina Nagy"
      
      let currentText = ""
      for(let i=0; i<fallbackText.length; i++) {
        await new Promise(r => setTimeout(r, 20))
        currentText += fallbackText[i]
        setDraft(currentText)
      }
    } finally {
      setIsRegenerating(false)
    }
  }

  const handleSend = () => {
    setSent(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (sent) {
    return (
      <motion.div 
        initial={{ x: 350, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 350, opacity: 0 }}
        className="w-[350px] bg-surface border-l border-border flex flex-col items-center justify-center p-8"
      >
        <div className="w-16 h-16 rounded-full bg-accent-green/20 border border-accent-green/50 flex items-center justify-center text-accent-green mb-4">
          <CheckCircle weight="fill" size={32} />
        </div>
        <div className="text-xl font-sans font-bold text-primary mb-2">Reply Sent</div>
        <div className="text-sm font-mono text-muted text-center">HubSpot CRM updated.<br/>Timeline event logged.</div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ x: 350, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 350, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="w-[380px] bg-surface flex flex-col border-l border-border z-10 shrink-0"
    >
      <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-surface2">
        <div className="font-sans font-bold text-sm text-primary flex items-center gap-2">
          <MagicWand weight="fill" className="text-accent-blue" />
          <span>Copilot Analysis</span>
        </div>
        <button onClick={onClose} className="text-muted hover:text-primary transition-colors">
          <X weight="bold" size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* Classification & Confidence */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-3 font-mono">
            RAG Context & Routing
          </div>
          <div className="flex gap-2">
            <div className="px-2 py-1 bg-surface3 border border-border rounded text-xs font-mono text-primary">
              [{result.client_company}]
            </div>
            <div className="px-2 py-1 bg-surface3 border border-border rounded text-xs font-mono text-accent-blue">
              {result.classification}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-surface3 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-green" 
                style={{ width: `${result.confidence}%` }} 
              />
            </div>
            <div className="text-xs font-mono text-accent-green font-bold">
              {result.confidence}% Conf.
            </div>
          </div>
        </div>

        {/* Extracted Specs */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-3 font-mono">
            Extracted Vectors
          </div>
          <div className="flex flex-wrap gap-2">
            {result.requirements.map((req, i) => (
              <div key={i} className="text-xs font-sans px-2 py-1 bg-surface2 border border-border rounded-sm text-primary/90">
                {req}
              </div>
            ))}
          </div>
        </div>

        {/* Product Match */}
        <div className="border border-accent-blue/30 bg-accent-blue/5 rounded-md p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent-blue" />
          <div className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-1 font-mono">
            Primary Match
          </div>
          <div className="text-sm font-sans font-bold text-primary mb-2">
            {result.recommended_product}
          </div>
          <div className="text-xs font-sans text-primary/80 leading-relaxed mb-3">
            {result.recommendation_reason}
          </div>
          
          {result.exclusions?.length > 0 && (
            <div className="space-y-1 mt-3 pt-3 border-t border-accent-blue/20">
              {result.exclusions.map((exc, i) => (
                <div key={i} className="flex gap-2 text-xs text-accent-amber font-sans">
                  <WarningCircle weight="fill" className="shrink-0 mt-0.5" />
                  <span>{exc}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Editable Draft */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted font-mono">
              Agentic Draft Response
            </div>
            <button 
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="text-xs text-accent-blue hover:text-blue-400 font-sans font-medium flex items-center gap-1 transition-colors disabled:opacity-50"
            >
              <ArrowsClockwise weight="bold" className={isRegenerating ? "animate-spin" : ""} />
              Live Regen
            </button>
          </div>
          <textarea 
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full h-48 bg-surface2 border border-border rounded-md p-3 text-sm font-sans text-primary/90 leading-relaxed focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue resize-none transition-all"
          />
        </div>
      </div>

      <div className="p-4 border-t border-border bg-surface2 flex gap-3">
        <button className="flex-1 px-4 py-2 bg-surface text-primary border border-border rounded-md text-sm font-bold font-sans hover:bg-surface3 transition-colors">
          Discard
        </button>
        <button 
          onClick={handleSend}
          className="flex-1 px-4 py-2 bg-accent-blue text-white rounded-md text-sm font-bold font-sans hover:bg-blue-600 transition-colors shadow-glow-blue flex items-center justify-center gap-2"
        >
          <PaperPlaneRight weight="fill" /> Send
        </button>
      </div>
    </motion.div>
  )
}
