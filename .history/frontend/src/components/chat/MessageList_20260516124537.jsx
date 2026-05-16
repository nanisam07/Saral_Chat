'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isYesterday, parseISO } from 'date-fns'

function formatTime(dateStr) {
  try {
    return format(parseISO(dateStr), 'h:mm a')
  } catch {
    return ''
  }
}

function formatDateLabel(dateStr) {
  try {
    const date = parseISO(dateStr)

    if (isToday(date)) return 'Today'
    if (isYesterday(date)) return 'Yesterday'

    return format(date, 'MMMM d, yyyy')
  } catch {
    return ''
  }
}

function shouldShowDateLabel(messages, index) {
  if (index === 0) return true

  try {
    const curr = parseISO(messages[index].createdAt)
    const prev = parseISO(messages[index - 1].createdAt)

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
    curr.username === prev.username &&
    !shouldShowDateLabel(messages, index)
  )
}

export default function MessageList({
  messages,
  currentUser,
  loading,
  room,
}) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400">
        Loading messages...
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
      <AnimatePresence>
        {messages.map((msg, i) => {
          const isSelf =
            msg.username === currentUser

          const grouped = shouldGroup(
            messages,
            i
          )

          const showDate =
            shouldShowDateLabel(
              messages,
              i
            )

          return (
            <div key={msg.id || i}>
              {showDate && (
                <div className="flex justify-center my-4">
                  <span className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full">
                    {formatDateLabel(
                      msg.createdAt
                    )}
                  </span>
                </div>
              )}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className={`flex ${
                  isSelf
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                    isSelf
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white'
                      : 'bg-white/5 text-slate-200 border border-white/10'
                  }`}
                >
                  {!grouped && (
                    <div className="text-xs mb-1 opacity-70">
                      {isSelf
                        ? 'You'
                        : msg.username}
                    </div>
                  )}

                  <div className="break-words">
                    {msg.text}
                  </div>

                  <div className="text-[10px] mt-1 opacity-50 text-right">
                    {formatTime(
                      msg.createdAt
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )
        })}
      </AnimatePresence>

      <div ref={bottomRef} />
    </div>
  )
}