'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isYesterday, parseISO } from 'date-fns'

function formatTime(dateStr) {
  try {
    const date = parseISO(dateStr)
    return format(date, 'h:mm a')
  } catch {
    return format(new Date(), 'h:mm a')
  }
}

function formatDateLabel(dateStr) {
  try {
    const date = parseISO(dateStr)
    if (isToday(date)) return 'Today'
    if (isYesterday(date)) return 'Yesterday'
    return format(date, 'MMMM d, yyyy')
  } catch {
    return 'Today'
  }
}

function shouldShowDateLabel(messages, index) {
  if (index === 0) return true
  try {
    const curr = parseISO(messages[index].attributes?.createdAt)
    const prev = parseISO(messages[index - 1].attributes?.createdAt)
    return format(curr, 'yyyy-MM-dd') !== format(prev, 'yyyy-MM-dd')
  } catch {
    return false
  }
}

function shouldGroup(messages, index) {
  if (index === 0) return false
  const curr = messages[index]
  const prev = messages[index - 1]
  return (
    curr.attributes?.username === prev.attributes?.username &&
    !shouldShowDateLabel(messages, index)
  )
}

export default function MessageList({ messages, currentUser, loading, room }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!room) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M7 10C7 8.34315 8.34315 7 10 7H26C27.6569 7 29 8.34315 29 10V22C29 23.6569 27.6569 25 26 25H20L14 31V25H10C8.34315 25 7 23.6569 7 22V10Z"
                stroke="url(#mlg)" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="13" cy="16" r="2" fill="url(#mlg)" opacity="0.5"/>
              <circle cx="18" cy="16" r="2" fill="url(#mlg)" opacity="0.5"/>
              <circle cx="23" cy="16" r="2" fill="url(#mlg)" opacity="0.5"/>
              <defs>
                <linearGradient id="mlg" x1="7" y1="7" x2="29" y2="31" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8b5cf6" opacity="0.4"/><stop offset="1" stopColor="#38bdf8" opacity="0.4"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2">No room selected</h3>
          <p className="text-slate-500 text-sm max-w-xs">Join a room to start chatting with others in real time</p>
        </motion.div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-violet-500"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -6, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
          <p className="text-slate-500 text-sm">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-full gap-4 py-16"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <StarIcon />
          </div>
          <div className="text-center">
            <p className="text-white font-display font-bold mb-1">Start the conversation</p>
            <p className="text-slate-500 text-sm">Be the first to send a message in <span className="text-violet-400">#{room}</span></p>
          </div>
        </motion.div>
      ) : (
        <>
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => {
              const isSelf = msg.attributes?.username === currentUser
              const grouped = shouldGroup(messages, i)
              const showDate = shouldShowDateLabel(messages, i)
              const dateStr = msg.attributes?.createdAt

              return (
                <div key={msg.id || i}>
                  {/* Date label */}
                  {showDate && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3 my-5"
                    >
                      <div className="flex-1 h-px bg-white/[0.05]" />
                      <span className="text-xs text-slate-600 font-mono-custom px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05]">
                        {formatDateLabel(dateStr)}
                      </span>
                      <div className="flex-1 h-px bg-white/[0.05]" />
                    </motion.div>
                  )}

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${isSelf ? 'flex-row-reverse' : 'flex-row'} ${grouped ? 'mt-0.5' : 'mt-3'}`}
                  >
                    {/* Avatar */}
                    {!grouped ? (
                      <div className="flex-shrink-0 mt-0.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-display ${
                          isSelf
                            ? 'bg-gradient-to-br from-violet-500 to-sky-500 text-white'
                            : 'bg-white/[0.08] text-slate-300'
                        }`}>
                          {msg.attributes?.username?.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    ) : (
                      <div className="w-8 flex-shrink-0" />
                    )}

                    {/* Bubble */}
                    <div className={`max-w-[70%] min-w-0 ${isSelf ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      {/* Username */}
                      {!grouped && (
                        <div className={`flex items-center gap-2 ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}>
                          <span className={`text-xs font-semibold font-display ${isSelf ? 'text-violet-400' : 'text-slate-300'}`}>
                            {isSelf ? 'You' : msg.attributes?.username}
                          </span>
                          <span className="text-xs text-slate-600 font-mono-custom">
                            {formatTime(dateStr)}
                          </span>
                        </div>
                      )}

                      {/* Text bubble */}
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                        isSelf
                          ? 'msg-self rounded-tr-sm'
                          : 'msg-other rounded-tl-sm'
                      } ${grouped && isSelf ? 'rounded-tr-sm' : ''} ${grouped && !isSelf ? 'rounded-tl-sm' : ''}`}>
                        {msg.attributes?.text}
                      </div>

                      {/* Timestamp for grouped */}
                      {grouped && (
                        <span className={`text-xs text-slate-700 font-mono-custom px-1 ${isSelf ? 'text-right' : 'text-left'}`}>
                          {formatTime(dateStr)}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </AnimatePresence>
          <div ref={bottomRef} />
        </>
      )}
    </div>
  )
}

const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-600">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
