'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [identifier, setIdentifier] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [showPassword, setShowPassword] =
    useState(false)

  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !identifier.trim() ||
      !password.trim()
    ) {
      toast.error(
        'Please fill in all fields'
      )

      return
    }

    setLoading(true)

    try {
      await login(
        identifier.trim(),
        password
      )
    } catch (err) {
      toast.error(
        err.message || 'Login failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] overflow-hidden relative text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-violet-700/20 rounded-full blur-[160px] -top-40 -left-40 animate-pulse" />

        <div className="absolute w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[160px] bottom-0 right-0 animate-pulse" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* MAIN */}
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* LEFT HERO */}
        <div className="hidden lg:flex flex-col justify-center px-16 xl:px-24 relative">
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-10">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-xs tracking-[0.25em] uppercase text-slate-300">
                Premium Realtime Messaging
              </span>
            </div>

            {/* BIG HEADING */}
            <h1 className="text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight mb-8">
              Login
              <br />

              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 text-transparent bg-clip-text italic">
                to Continue.
              </span>
            </h1>

            {/* QUOTE */}
            <p className="text-2xl text-slate-400 leading-relaxed max-w-2xl mb-12 font-light">
              “Every conversation begins with trust.
              Step into a futuristic space where
              communication feels effortless,
              immersive, and alive.”
            </p>

            {/* CHAT MOCKUP */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative max-w-xl"
            >
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />

                  <div className="w-3 h-3 rounded-full bg-yellow-400" />

                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                <div className="space-y-5">
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

              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[350px] h-[200px] bg-violet-600/20 blur-[120px]" />
            </motion.div>

            {/* FOOTER QUOTE */}
            <div className="mt-12 border-l-2 border-violet-500 pl-6">
              <p className="text-3xl italic text-slate-300 leading-relaxed">
                “Stay connected. Stay limitless.”
              </p>

              <p className="mt-3 text-sm text-slate-500 tracking-[0.25em] uppercase">
                Saral Chat Suite
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT LOGIN */}
        <div className="flex items-center justify-center px-6 py-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="w-full max-w-md"
          >
            {/* LOGO */}
            <div className="text-center mb-10">
              <h1 className="text-6xl font-black italic bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 text-transparent bg-clip-text mb-3">
                Saral Chat
              </h1>

              <p className="text-slate-500 tracking-[0.25em] uppercase text-sm">
                Secure • Modern • Realtime
              </p>
            </div>

            {/* CARD */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-8 lg:p-10 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  Welcome Back
                </h2>

                <p className="text-slate-400">
                  Sign in to continue your
                  conversations.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* EMAIL */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-500 block mb-2">
                    Email / Username
                  </label>

                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) =>
                      setIdentifier(
                        e.target.value
                      )
                    }
                    placeholder="Enter your identity"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-500 block mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      placeholder="••••••••"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 pr-14 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-all"
                    >
                      {showPassword
                        ? 'Hide'
                        : 'Show'}
                    </button>
                  </div>
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.45)] transition-all"
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span
                        key="loading"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                      >
                        Authenticating...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                      >
                        Login →
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              {/* REGISTER */}
              <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/register"
                    className="text-violet-400 hover:text-violet-300 font-medium transition-all"
                  >
                    Create one →
                  </Link>
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <p className="text-center text-xs text-slate-600 mt-8 tracking-[0.2em] uppercase">
              Protected by end-to-end encryption
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ChatBubble({
  name,
  text,
  self,
}) {
  return (
    <div
      className={`flex ${
        self
          ? 'justify-end'
          : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[80%] px-5 py-4 rounded-2xl ${
          self
            ? 'bg-gradient-to-r from-violet-600 to-sky-500 text-white'
            : 'bg-white/5 border border-white/10 text-slate-200'
        }`}
      >
        <p className="text-xs mb-1 opacity-70">
          {name}
        </p>

        <p className="text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  )
}