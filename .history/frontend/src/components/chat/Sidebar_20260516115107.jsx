'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'

export default function Sidebar({ activeUsers, currentRoom, username, connected, onSwitchRoom }) {
  const { logout } = useAuth()

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -280, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      className="w-64 flex-shrink-0 flex flex-col relative z-10 border-r border-white/[0.06]"
      style={{ background: 'rgba(5, 11, 20, 0.8)', backdropFilter: 'blur(20px)' }}
    >
      {/* Top logo */}
      <div className="p-5 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg animated-border flex items-center justify-center bg-void-900 flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V15C19 16.1046 18.1046 17 17 17H14L10 21V17H7C5.89543 17 5 16.1046 5 15V7Z"
                stroke="url(#sg)" strokeWidth="1.5" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="sg" x1="5" y1="5" x2="19" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a78bfa"/><stop offset="1" stopColor="#38bdf8"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-white text-sm truncate">NexusChat</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <span className="text-xs text-slate-500">{connected ? 'Connected' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Room */}
      {currentRoom && (
        <div className="px-4 pt-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">Current Room</p>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onSwitchRoom}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/15 transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <HashIcon className="text-violet-400" />
            </div>
            <span className="font-medium text-violet-300 text-sm truncate">{currentRoom}</span>
            <SwapIcon className="text-violet-400/60 group-hover:text-violet-400 ml-auto flex-shrink-0 transition-colors" />
          </motion.button>
        </div>
      )}

      {/* Active Users */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Online</p>
          <span className="text-xs text-emerald-400 font-mono-custom bg-emerald-400/10 px-1.5 py-0.5 rounded-md">
            {activeUsers.length}
          </span>
        </div>

        <div className="space-y-1">
          {activeUsers.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-2">
                <UsersIcon />
              </div>
              <p className="text-slate-600 text-xs">No users online</p>
            </div>
          ) : (
            activeUsers.map((u, i) => (
              <motion.div
                key={u}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${
                  u === username
                    ? 'bg-violet-500/10 border border-violet-500/15'
                    : 'hover:bg-white/[0.03]'
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-display ${
                    u === username
                      ? 'bg-gradient-to-br from-violet-500 to-sky-500 text-white'
                      : 'bg-white/[0.08] text-slate-300'
                  }`}>
                    {u.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-void-900" />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm truncate ${u === username ? 'text-violet-300 font-medium' : 'text-slate-300'}`}>
                    {u}
                    {u === username && <span className="text-violet-500 text-xs ml-1">(you)</span>}
                  </p>
                  <p className="text-xs text-slate-600 truncate">Active now</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* User footer & logout */}
      <div className="p-4 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center text-sm font-bold font-display text-white flex-shrink-0">
              {username?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-void-900" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{username}</p>
            <p className="text-xs text-emerald-400">Online</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-red-500/10 border border-white/[0.06] hover:border-red-500/20 text-slate-400 hover:text-red-400 transition-all text-sm"
        >
          <LogoutIcon />
          Sign Out
        </motion.button>
      </div>
    </motion.aside>
  )
}

const HashIcon = ({ className }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
)
const SwapIcon = ({ className }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
  </svg>
)
const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-600">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const LogoutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)
