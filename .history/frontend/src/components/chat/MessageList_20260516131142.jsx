'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'


export default function MessageList({
  messages,
  currentUser,
  loading,
}) {
  const bottomRef = useRef(null)

  // AUTO SCROLL TO BOTTOM
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              className="w-3 h-3 rounded-full bg-violet-400"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="
        flex-1
        overflow-y-auto
        px-4
        md:px-8
        py-6
        space-y-4
        scroll-smooth
      "
    >
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome to Saral Chat
            </h2>

            <p className="text-slate-400">
              Start the realtime conversation ✨
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id || index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.25,
              }}
            >
          
            </motion.div>
          ))}

          {/* AUTO SCROLL TARGET */}
          <div ref={bottomRef} />
        </>
      )}
    </div>
  )
}