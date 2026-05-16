'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const textareaRef = useRef(null)

  const handleSend = useCallback(async () => {
    const trimmed = text.trim()
    if (!trimmed || sending || disabled) return
    setSending(true)
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
    try {
      await onSend(trimmed)
    } finally {
      setSending(false)
      textareaRef.current?.focus()
    }
  }, [text, sending, disabled, onSend])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChange = (e) => {
    setText(e.target.value)
    // Auto-resize
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'
  }

  const hasText = text.trim().length > 0

  return (
    <div
      className="px-4 py-3 border-t border-white/[0.05] flex-shrink-0"
      style={{ background: 'rgba(5, 11, 20, 0.7)', backdropFilter: 'blur(20px)' }}
    >
      {disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 py-2 mb-2 text-xs text-slate-600"
        >
          <HashIcon />
          <span>Join a room to start messaging</span>
        </motion.div>
      )}

      <div className="flex items-end gap-3">
        {/* Attach button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 flex-shrink-0 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] flex items-center justify-center text-slate-500 hover:text-slate-300 transition-all mb-0.5"
          disabled={disabled}
          title="Attach file"
        >
          <PaperclipIcon />
        </motion.button>

        {/* Textarea */}
        <div className="flex-1 relative">
          <div className={`relative rounded-2xl border transition-all duration-300 ${
            hasText && !disabled
              ? 'border-violet-500/30 bg-white/[0.06]'
              : 'border-white/[0.07] bg-white/[0.03]'
          } ${disabled ? 'opacity-50' : ''}`}>
            {hasText && !disabled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.2), 0 0 20px rgba(139,92,246,0.05)' }}
              />
            )}
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={disabled ? 'Join a room first...' : 'Type a message... (Enter to send, Shift+Enter for new line)'}
              disabled={disabled}
              rows={1}
              className="w-full bg-transparent px-4 py-3 text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none font-sans leading-relaxed"
              style={{ maxHeight: '120px', minHeight: '44px' }}
            />
          </div>
        </div>

        {/* Emoji button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 flex-shrink-0 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] flex items-center justify-center text-slate-500 hover:text-yellow-400 transition-all mb-0.5"
          disabled={disabled}
          title="Emoji"
        >
          <EmojiIcon />
        </motion.button>

        {/* Send button */}
        <motion.button
          whileHover={hasText && !disabled ? { scale: 1.05 } : {}}
          whileTap={hasText && !disabled ? { scale: 0.95 } : {}}
          onClick={handleSend}
          disabled={!hasText || disabled || sending}
          className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center transition-all mb-0.5 relative overflow-hidden"
          style={
            hasText && !disabled
              ? {
                  background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
                  boxShadow: '0 0 20px rgba(139,92,246,0.4)',
                }
              : {
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }
          }
        >
          <AnimatePresence mode="wait">
            {sending ? (
              <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
              </motion.div>
            ) : (
              <motion.div key="send" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <SendIcon active={hasText && !disabled} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Hint */}
      <AnimatePresence>
        {hasText && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="text-xs text-slate-700 mt-1.5 pl-14 font-mono-custom"
          >
            Enter ↵ to send · Shift+Enter for newline
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const SendIcon = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? 'white' : 'currentColor'} strokeWidth="2" className={active ? '' : 'text-slate-600'}>
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)
const PaperclipIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
)
const EmojiIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
)
const HashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
)
