import React from 'react'
import { SAMPLE_EMAILS } from '../data.js'
import { EnvelopeSimple, PaperPlaneRight, Star, Tag, Clock } from '@phosphor-icons/react'

export default function InboxReplica({ activeEmail, setActiveEmail }) {
  return (
    <div className="flex h-full w-full bg-background border-r border-border">
      {/* Sidebar - Folders */}
      <div className="w-60 bg-surface border-r border-border flex flex-col hidden md:flex">
        <div className="p-4">
          <button className="w-full bg-accent-blue/10 hover:bg-accent-blue/20 border border-accent-blue/30 text-accent-blue font-sans font-medium py-2 rounded-md flex items-center justify-center gap-2 transition-colors">
            <span className="text-lg">+</span> Compose
          </button>
        </div>
        <nav className="flex-1 px-3 py-2 flex flex-col gap-1">
          <NavItem icon={<EnvelopeSimple />} label="Inbox" active badge="4" />
          <NavItem icon={<Star />} label="Starred" />
          <NavItem icon={<Clock />} label="Snoozed" />
          <NavItem icon={<PaperPlaneRight />} label="Sent" />
          
          <div className="mt-6 mb-2 px-3 text-xs font-bold tracking-widest text-muted uppercase">Labels</div>
          <NavItem icon={<Tag />} label="Priority" dotColor="#ef4444" />
          <NavItem icon={<Tag />} label="Tech Support" dotColor="#f59e0b" />
          <NavItem icon={<Tag />} label="Product Inquiries" dotColor="#10b981" />
        </nav>
      </div>

      {/* List - Emails */}
      <div className="w-80 bg-surface flex flex-col border-r border-border">
        <div className="p-4 border-b border-border bg-surface2">
          <input 
            type="text" 
            placeholder="Search mail..." 
            className="w-full bg-background border border-border rounded px-3 py-1.5 text-sm focus:outline-none focus:border-accent-blue font-sans"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {SAMPLE_EMAILS.map((email, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveEmail(email)}
              className={`p-4 border-b border-border cursor-pointer transition-colors ${activeEmail.body === email.body ? 'bg-surface3 border-l-2 border-l-accent-blue' : 'hover:bg-surface2'}`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <div className="font-sans font-bold text-sm text-primary truncate max-w-[160px]">
                  {email.from.split('<')[0].trim()}
                </div>
                <div className="font-mono text-[10px] text-muted whitespace-nowrap">
                  {idx === 0 ? '9:00 AM' : idx === 1 ? '8:45 AM' : 'Yesterday'}
                </div>
              </div>
              <div className="font-sans text-xs font-semibold text-primary/80 truncate mb-1">
                {email.subject}
              </div>
              <div className="font-sans text-xs text-muted truncate">
                {email.body.substring(0, 60)}...
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pane - Reading View */}
      <div className="flex-1 bg-background flex flex-col overflow-y-auto">
        <div className="p-8 max-w-3xl w-full">
          <h2 className="text-2xl font-sans font-bold text-primary mb-6 leading-tight">
            {activeEmail.subject}
          </h2>

          {/* Prior thread messages */}
          {activeEmail.thread?.length > 0 && (
            <div className="mb-6 space-y-4">
              {activeEmail.thread.map((msg, i) => {
                const isUs = msg.from.includes('look2innovate')
                return (
                  <div key={i} className="border border-border rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-surface2 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${isUs ? 'bg-accent-blue text-white' : 'bg-surface3 text-primary'}`}>
                          {msg.from.charAt(0)}
                        </div>
                        <div>
                          <span className="text-xs font-sans font-bold text-primary">{msg.from.split('<')[0].trim()}</span>
                          {isUs && <span className="ml-2 text-[10px] font-mono text-accent-blue bg-accent-blue/10 px-1.5 py-0.5 rounded">You</span>}
                        </div>
                      </div>
                      <div className="font-mono text-[10px] text-muted">{msg.date}</div>
                    </div>
                    <div className="px-4 py-3 text-sm font-sans text-primary/80 leading-relaxed whitespace-pre-wrap">
                      {msg.body}
                    </div>
                  </div>
                )
              })}
              <div className="flex items-center gap-3 text-[10px] font-mono text-muted">
                <div className="flex-1 h-px bg-border" />
                <span>NEW MESSAGE</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </div>
          )}

          {/* Current email */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-surface3 flex items-center justify-center font-bold text-primary">
              {activeEmail.from.charAt(0)}
            </div>
            <div>
              <div className="font-sans text-sm font-bold text-primary">
                {activeEmail.from.split('<')[0].trim()}
              </div>
              <div className="font-mono text-xs text-muted">
                {`<${activeEmail.from.split('<')[1] || activeEmail.from}`}
              </div>
            </div>
            <div className="ml-auto font-mono text-xs text-muted">
              Today, 9:00 AM (2 hours ago)
            </div>
          </div>

          <div className="font-sans text-sm text-primary/90 leading-relaxed whitespace-pre-wrap">
            {activeEmail.body}
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon, label, active, badge, dotColor }) {
  return (
    <div className={`flex items-center justify-between px-3 py-2 rounded-md font-sans text-sm cursor-pointer transition-colors ${active ? 'bg-surface3 text-primary font-bold' : 'text-muted hover:bg-surface2 hover:text-primary'}`}>
      <div className="flex items-center gap-3">
        {dotColor ? (
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dotColor }} />
        ) : (
          <div className={`text-lg ${active ? 'text-primary' : 'text-muted'}`}>{icon}</div>
        )}
        <span>{label}</span>
      </div>
      {badge && (
        <span className="font-mono text-[10px] bg-accent-blue text-white px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}
    </div>
  )
}
