'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'

export const GlassCard = forwardRef(function GlassCard(
  { children, className = '', hover = false, animate = true, ...props },
  ref
) {
  const base = 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] rounded-2xl'
  const hoverClass = hover ? 'transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12]' : ''

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={`${base} ${hoverClass} ${className}`}
        style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)' }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div
      ref={ref}
      className={`${base} ${hoverClass} ${className}`}
      style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)' }}
      {...props}
    >
      {children}
    </div>
  )
})

export function GradientButton({ children, className = '', loading = false, ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`btn-gradient rounded-xl py-3 px-6 text-white font-semibold text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export function Avatar({ name, size = 'md', online = false, gradient = false }) {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  }
  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  }

  return (
    <div className="relative flex-shrink-0">
      <div className={`${sizes[size]} rounded-full flex items-center justify-center font-bold font-display ${
        gradient
          ? 'bg-gradient-to-br from-violet-500 to-sky-500 text-white'
          : 'bg-white/[0.08] text-slate-300'
      }`}>
        {name?.charAt(0).toUpperCase()}
      </div>
      {online !== false && (
        <div className={`${dotSizes[size]} absolute -bottom-0.5 -right-0.5 rounded-full ${online ? 'bg-emerald-400' : 'bg-slate-600'} border-2 border-void-900`} />
      )}
    </div>
  )
}

export function Spinner({ size = 16 }) {
  return (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  )
}
