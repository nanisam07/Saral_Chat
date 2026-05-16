'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  })

  const [loading, setLoading] =
    useState(false)

  const [showPassword, setShowPassword] =
    useState(false)

  const { register } = useAuth()

  const handleChange = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]:
        e.target.value,
    }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    const {
      username,
      email,
      password,
      confirm,
    } = form

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      toast.error(
        'Please fill all fields'
      )

      return
    }

    if (password !== confirm) {
      toast.error(
        'Passwords do not match'
      )

      return
    }

    if (password.length < 6) {
      toast.error(
        'Password must be at least 6 characters'
      )

      return
    }

    setLoading(true)

    try {
      await register(
        username.trim(),
        email.trim(),
        password
      )
    } catch (err) {
      toast.error(
        err.message ||
          'Registration failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-[#020617] text-white relative">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-violet-700/20 rounded-full blur-[160px] -top-40 -left-40 animate-pulse" />

        <div className="absolute w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[160px] bottom-0 right-0 animate-pulse" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 h-screen grid lg:grid-cols-2 overflow-hidden">
        {/* LEFT HERO */}
        <div className="hidden lg:flex flex-col justify-center px-10 xl:px-20 relative overflow-hidden">
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
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-xs tracking-[0.25em] uppercase text-slate-300">
                Join Realtime Conversations
              </span>
            </div>

            {/* HEADING */}
            <h1 className="text-5xl xl:text-7xl font-black leading-[0.9] tracking-tight mb-6">
  Join
  <br />

  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 text-transparent bg-clip-text italic">
    Saral Chat.
  </span>
</h1>

            {/* QUOTE */}
            <p className="text-lg xl:text-xl text-slate-400 leading-relaxed max-w-xl mb-10">
              “Every conversation starts with
a connection. Build friendships,
communities, and realtime experiences
inside Saral Chat.”
            </p>


            {/* MOCK CARD */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative max-w-lg"
            >
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                <div className="space-y-4">
                  <PreviewBubble
                    name="Sophia"
                    text="Welcome to Saral Chat ✨"
                    self={false}
                  />

                  <PreviewBubble
                    name="You"
                    text="Creating my new account."
                    self={true}
                  />

                  <PreviewBubble
                    name="Daniel"
                    text="Realtime communication starts here."
                    self={false}
                  />
                </div>
              </div>
            </motion.div>

            {/* FOOTER QUOTE */}
            <div className="mt-10 border-l-2 border-violet-500 pl-5">
              <p className="text-2xl italic text-slate-300 leading-relaxed">
                “Connect beyond boundaries.”
              </p>

              <p className="mt-2 text-sm text-slate-500 tracking-[0.25em] uppercase">
                Saral Chat Suite
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center px-5 py-6 lg:py-0 h-screen overflow-hidden">
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
            {/* MOBILE HERO */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-5xl font-black italic bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 text-transparent bg-clip-text mb-3">
                Saral Chat
              </h1>

              <p className="text-slate-400 text-sm">
                “Connect beyond boundaries.”
              </p>
            </div>

            {/* DESKTOP LOGO */}
            <div className="hidden lg:block text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-black italic bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 text-transparent bg-clip-text mb-3">
                Saral Chat
              </h1>

              <p className="text-slate-500 tracking-[0.25em] uppercase text-sm">
                Modern • Secure • Realtime
              </p>
            </div>

            {/* CARD */}
            <div className="rounded-[32px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-6 lg:p-8 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">
                  Create Account
                </h2>

                <p className="text-slate-400">
                  Start your realtime journey.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <InputField
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                />

                <InputField
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />

                <div className="relative">
                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 pr-16 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all"
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

                <InputField
                  name="confirm"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />

                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.45)] transition-all mt-2"
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span>
                        Creating Account...
                      </motion.span>
                    ) : (
                      <motion.span>
                        Register →
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-400 text-sm">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="text-violet-400 hover:text-violet-300 font-medium"
                  >
                    Login →
                  </Link>
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-slate-600 mt-6 tracking-[0.2em] uppercase">
              Protected by secure authentication
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function InputField(props) {
  return (
    <input
      {...props}
      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all"
    />
  )
}

function PreviewBubble({
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