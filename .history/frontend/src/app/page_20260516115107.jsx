'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/chat')
      } else {
        router.replace('/login')
      }
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-void-950 flex items-center justify-center">
      {/* Background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-96 h-96 bg-violet-600/20 top-1/4 left-1/4 animate-[glowPulse_4s_ease-in-out_infinite]" />
        <div className="glow-orb w-80 h-80 bg-sky-500/15 bottom-1/4 right-1/4 animate-[glowPulse_5s_ease-in-out_infinite_1s]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl animated-border flex items-center justify-center bg-void-900">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 12C8 9.79086 9.79086 8 12 8H28C30.2091 8 32 9.79086 32 12V24C32 26.2091 30.2091 28 28 28H22L16 34V28H12C9.79086 28 8 26.2091 8 24V12Z"
                stroke="url(#logoGrad)" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="15" cy="18" r="2" fill="url(#logoGrad)" />
              <circle cx="20" cy="18" r="2" fill="url(#logoGrad)" />
              <circle cx="25" cy="18" r="2" fill="url(#logoGrad)" />
              <defs>
                <linearGradient id="logoGrad" x1="8" y1="8" x2="32" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a78bfa" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#f472b6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-violet-500"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <p className="text-slate-500 text-sm font-display tracking-widest uppercase">
          Initializing
        </p>
      </motion.div>
    </div>
  )
}
