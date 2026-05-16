'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react' // Clean, modern icon alternative
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!identifier.trim() || !password.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      await login(identifier.trim(), password)
    } catch (err) {
      toast.error(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative h-screen overflow-hidden bg-[#020617] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[700px] w-[700px] animate-pulse rounded-full bg-violet-700/20 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] animate-pulse rounded-full bg-sky-500/20 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-10 grid h-screen overflow-hidden lg:grid-cols-2">
        
        {/* LEFT SIDE (DESKTOP HERO) */}
        <div className="relative hidden flex-col justify-center overflow-hidden px-10 lg:flex xl:px-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* BADGE */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs uppercase tracking-[0.25em] text-slate-300">
                Premium Realtime Messaging
              </span>
            </div>

            {/* HEADING */}
            <h1 className="mb-6 text-5xl font-black leading-[0.9] tracking-tight xl:text-7xl">
              Login
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text italic text-transparent">
                to Continue.
              </span>
            </h1>

            {/* QUOTE */}
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-400 xl:text-xl">
              “Every meaningful conversation starts with trust. Step into a futuristic
              communication space designed for seamless realtime interaction.”
            </p>

            {/* CHAT MOCKUP WITH HOVER IMAGE EFFECT */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative max-w-lg"
            >
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_80px_rgba(139,92,246,0.15)] backdrop-blur-2xl">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="space-y-4">
                  <ChatBubble
                    name="Sophia"
                    text="Realtime collaboration feels magical ✨"
                    self={false}
                  />
                  <ChatBubble
                    name="You"
                    text="The interface feels futuristic."
                    self={true}
                  />
                  <ChatBubble
                    name="Daniel"
                    text="Welcome back to Saral Chat."
                    self={false}
                  />
                </div>
              </div>

              {/* FLOATING DECORATIVE IMAGE BACKGROUND */}
              <motion.img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Team"
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ duration: 0.4 }}
                className="absolute -right-12 -top-20 z-[-1] h-32 w-48 rounded-2xl border border-white/10 object-cover opacity-30 shadow-2xl blur-[1px] filter transition-all hover:opacity-80 hover:blur-0"
              />

              <div className="absolute -bottom-20 left-1/2 h-[200px] w-[300px] -translate-x-1/2 bg-violet-600/20 blur-[120px]" />
            </motion.div>

            {/* FOOTER QUOTE */}
            <div className="mt-10 border-l-2 border-violet-500 pl-5">
              <p className="text-2xl italic text-slate-300 leading-relaxed">
                “Stay connected. Stay limitless.”
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-500">
                Saral Chat Suite
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE (LOGIN FORM) */}
        <div className="flex h-screen items-center justify-center overflow-hidden px-5 py-6 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >
            {/* MOBILE HERO HEADERS */}
            <div className="mb-8 text-center lg:hidden">
              <h1 className="mb-3 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-5xl font-black italic text-transparent">
                Saral Chat
              </h1>
              <p className="text-sm leading-relaxed text-slate-400">
                “Every conversation begins with trust.”
              </p>
            </div>

            {/* DESKTOP BRANDING HEADERS */}
            <div className="hidden text-center lg:mb-8 lg:block">
              <h1 className="mb-3 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-4xl font-black italic text-transparent lg:text-5xl">
                Saral Chat
              </h1>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                Secure • Modern • Realtime
              </p>
            </div>

            {/* INTERACTIVE FORM CARD */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_80px_rgba(139,92,246,0.15)] backdrop-blur-2xl lg:p-8">
              <div className="mb-7">
                <h2 className="mb-2 text-3xl font-bold">Welcome Back</h2>
                <p className="text-slate-400">
                  Sign in to continue your conversations.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* IDENTIFIER INPUT */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
                    Email / Username
                  </label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter your identity"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white transition-all placeholder:text-slate-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                  />
                </div>

                {/* PASSWORD INPUT */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 pr-14 text-white transition-all placeholder:text-slate-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 transition-all hover:text-white"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 py-4 font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.45)] transition-all disabled:opacity-50"
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Authenticating...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Login →
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              {/* FOOTER ACTIONS */}
              <div className="mt-7 text-center">
                <p className="text-sm text-slate-400">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/register"
                    className="font-medium text-violet-400 transition-all hover:text-violet-300"
                  >
                    Create one →
                  </Link>
                </p>
              </div>
            </div>

            {/* SUBFOOTER SECURITY NOTICE */}
            <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-slate-600">
              Protected by end-to-end encryption
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

function ChatBubble({ name, text, self }) {
  return (
    <div className={`flex ${self ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-4 ${
          self
            ? 'bg-gradient-to-r from-violet-600 to-sky-500 text-white'
            : 'border border-white/10 bg-white/5 text-slate-200'
        }`}
      >
        <p className="mb-1 text-xs opacity-70">{name}</p>
        <p className="text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}