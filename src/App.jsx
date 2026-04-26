import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from '@phosphor-icons/react'
import InboxReplica from './screens/InboxReplica.jsx'
import AdminDashboard from './screens/AdminDashboard.jsx'
import CopilotSidebar from './components/CopilotSidebar.jsx'
import AgentPipelineOverlay from './components/AgentPipelineOverlay.jsx'
import { MOCK_RESPONSES, SAMPLE_EMAILS, DEFAULT_CLIENTS, DEFAULT_PRODUCTS } from './data.js'

export default function App() {
  const [view, setView] = useState('inbox') // 'inbox' | 'admin'
  const [activeEmail, setActiveEmail] = useState(SAMPLE_EMAILS[0])
  const [processingState, setProcessingState] = useState('idle') // 'idle' | 'processing' | 'done'
  const [analysisResult, setAnalysisResult] = useState(null)
  const [products, setProducts] = useState(DEFAULT_PRODUCTS)
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.setAttribute('data-theme', 'light')
    } else {
      root.classList.remove('light')
      root.setAttribute('data-theme', 'dark')
    }
    console.log('Current theme:', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }
  const handleProcessEmail = () => {
    setProcessingState('processing')
  }

  const handlePipelineComplete = () => {
    const idx = SAMPLE_EMAILS.findIndex(s => s.body === activeEmail.body)
    setAnalysisResult(idx !== -1 ? MOCK_RESPONSES[idx] : MOCK_RESPONSES[0])
    setProcessingState('done')
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top Navigation */}
      <header className="h-14 border-b border-border bg-surface2 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-accent-blue rounded flex items-center justify-center font-bold text-white shadow-glow-blue">
            ⚡
          </div>
          <div>
            <div className="font-sans font-bold text-sm text-primary leading-tight">Inbox Sales Copilot</div>
            <div className="font-mono text-[10px] text-muted">Look2Innovate Demo</div>
          </div>
        </div>
        
        <nav className="flex gap-2">
          <button 
            onClick={() => setView('inbox')}
            className={`px-4 py-1.5 rounded-md font-sans text-sm font-medium transition-all ${view === 'inbox' ? 'bg-surface3 text-primary' : 'text-muted hover:text-primary'}`}
          >
            Inbox
          </button>
          <button 
            onClick={() => setView('admin')}
            className={`px-4 py-1.5 rounded-md font-sans text-sm font-medium transition-all ${view === 'admin' ? 'bg-surface3 text-primary' : 'text-muted hover:text-primary'}`}
          >
            Dashboard
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full bg-surface3 flex items-center justify-center text-primary hover:bg-border transition-colors"
          >
            {theme === 'dark' ? <Sun weight="bold" /> : <Moon weight="bold" />}
          </button>
          <div className="text-right border-l border-border pl-4">
            <div className="text-sm font-bold text-primary">Mina Nagy</div>
            <div className="text-[10px] uppercase tracking-wider text-muted font-mono">Sales Engineer</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-xs font-bold text-white">
            MN
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'admin' ? (
            <motion.div 
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 w-full h-full overflow-y-auto"
            >
              <AdminDashboard clients={DEFAULT_CLIENTS} products={products} setProducts={setProducts} />
            </motion.div>
          ) : (
            <motion.div 
              key="inbox"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex w-full h-full overflow-hidden"
            >
              <InboxReplica 
                activeEmail={activeEmail} 
                setActiveEmail={(e) => {
                  setActiveEmail(e)
                  setProcessingState('idle')
                  setAnalysisResult(null)
                }} 
              />
              
              <AnimatePresence>
                {processingState === 'done' && analysisResult && (
                  <CopilotSidebar 
                    result={analysisResult} 
                    emailBody={activeEmail.body}
                    onClose={() => setProcessingState('idle')} 
                  />
                )}
              </AnimatePresence>

              {/* Process Float CTA */}
              <AnimatePresence>
                {processingState === 'idle' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute bottom-6 right-6 z-20"
                  >
                    <button 
                      onClick={handleProcessEmail}
                      className="px-6 py-3 bg-accent-blue text-white font-sans font-bold text-sm rounded-md shadow-glow-blue hover:bg-blue-400 transition-all active:scale-95 flex items-center gap-2"
                    >
                      <span>Analyze with Copilot</span>
                      <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-xs">⌘+Enter</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {processingState === 'processing' && (
          <AgentPipelineOverlay onComplete={handlePipelineComplete} />
        )}
      </AnimatePresence>
    </div>
  )
}
