'use client'

import { motion } from 'framer-motion'

export default function MessageBubble({
  message,
  isOwn,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`flex ${
        isOwn
          ? 'justify-end'
          : 'justify-start'
      }`}
    >
      <div
        className={`
          max-w-[85%]
          md:max-w-[70%]
          px-4
          py-3
          rounded-3xl
          backdrop-blur-xl
          border
          shadow-lg
          relative
          overflow-hidden
          ${
            isOwn
              ? `
                bg-gradient-to-r
                from-violet-600
                via-fuchsia-500
                to-sky-500
                border-white/10
                text-white
                rounded-br-md
              `
              : `
                bg-white/[0.05]
                border-white/10
                text-slate-200
                rounded-bl-md
              `
          }
        `}
      >
        {/* Glow */}
        <div
          className={`
            absolute inset-0 opacity-20 blur-2xl
            ${
              isOwn
                ? 'bg-violet-400'
                : 'bg-slate-500'
            }
          `}
        />

        <div className="relative z-10">
          {/* USERNAME */}
          <p
            className={`
              text-xs
              font-semibold
              mb-1
              tracking-wide
              ${
                isOwn
                  ? 'text-white/70'
                  : 'text-violet-300'
              }
            `}
          >
            {message.username}
          </p>

          {/* MESSAGE */}
          <p className="text-sm md:text-base leading-relaxed break-words">
            {message.text}
          </p>

          {/* TIME */}
          <div className="flex justify-end mt-2">
            <span
              className={`
                text-[10px]
                ${
                  isOwn
                    ? 'text-white/60'
                    : 'text-slate-500'
                }
              `}
            >
              {new Date(
                message.createdAt
              ).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}