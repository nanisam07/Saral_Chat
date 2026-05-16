'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-violet-600/20 blur-[140px] rounded-full -top-40 -left-40 animate-pulse" />

        <div className="absolute w-[400px] h-[400px] bg-sky-500/20 blur-[120px] rounded-full bottom-0 right-0 animate-pulse" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-20 px-8 md:px-16 py-8 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-500 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.5)]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V13C19 14.1046 18.1046 15 17 15H13L9 19V15H7C5.89543 15 5 14.1046 5 13V7Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight">
              Saral Chat
            </h1>

            <p className="text-xs text-slate-400 tracking-[0.25em] uppercase">
              Realtime Communication
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4"
        >
          <Link href="/login">
            <button className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-sky-500 hover:scale-105 transition-all text-sm font-semibold shadow-[0_0_30px_rgba(139,92,246,0.4)]">
              Register
            </button>
          </Link>
        </motion.div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-8 md:px-16 pt-10 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-xs tracking-widest uppercase text-slate-300">
                Live Realtime Messaging
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-8">
              Conversations
              <br />

              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 text-transparent bg-clip-text">
                Without Limits
              </span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mb-10">
              Saral Chat is a premium realtime communication
              platform built using Next.js, Strapi, and
              Socket.io. Join rooms, collaborate instantly,
              and experience lightning-fast messaging with a
              futuristic interface.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link href="/register">
                <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 hover:scale-105 transition-all font-semibold shadow-[0_0_40px_rgba(139,92,246,0.45)]">
                  Start Chatting
                </button>
              </Link>

              <Link href="/login">
                <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-medium">
                  Explore Platform
                </button>
              </Link>
            </div>

            {/* Quote */}
            <div className="mt-16 border-l-2 border-violet-500 pl-6">
              <p className="text-xl italic text-slate-300 leading-relaxed">
                “Technology becomes meaningful when
                conversations feel human.”
              </p>

              <p className="mt-3 text-sm text-slate-500 uppercase tracking-[0.25em]">
                Saral Communication Suite
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 shadow-[0_0_80px_rgba(139,92,246,0.15)] overflow-hidden">
              {/* Window Top */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              {/* Chat Preview */}
              <div className="space-y-5">
                <ChatBubble
                  name="Sophia"
                  message="Realtime syncing is incredibly smooth 🚀"
                  self={false}
                />

                <ChatBubble
                  name="You"
                  message="The UI feels futuristic and premium."
                  self={true}
                />

                <ChatBubble
                  name="Daniel"
                  message="Active users and room chat are working perfectly."
                  self={false}
                />

                <ChatBubble
                  name="You"
                  message="Built using Next.js + Socket.io + Strapi."
                  self={true}
                />
              </div>

              {/* Bottom glow */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-violet-600/20 blur-[100px]" />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function ChatBubble({
  name,
  message,
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
          {message}
        </p>
      </div>
    </div>
  )
}