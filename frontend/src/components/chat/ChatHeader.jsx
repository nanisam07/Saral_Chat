'use client'

import { motion } from 'framer-motion'

export default function ChatHeader({ room, connected, activeUsers, sidebarOpen, onToggleSidebar, onSwitchRoom }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] flex-shrink-0"
      style={{ background: 'rgba(5, 11, 20, 0.6)', backdropFilter: 'blur(20px)' }}
    >
      {/* Left: toggle + room name */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleSidebar}
          className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white transition-all"
        >
          <MenuIcon open={sidebarOpen} />
        </motion.button>

        <div className="flex items-center gap-2.5">
          {room ? (
            <>
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <HashIcon className="text-violet-400" />
              </div>
              <div>
                <h1 className="font-display font-bold text-white text-base">{room}</h1>
                <p className="text-xs text-slate-500">
                  {activeUsers.length} {activeUsers.length === 1 ? 'member' : 'members'} online
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <HashIcon className="text-slate-500" />
              </div>
              <span className="text-slate-500 font-display text-sm">Select a room</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Connection status */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono-custom ${
          connected
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
          {connected ? 'Live' : 'Offline'}
        </div>

        {/* Active users count */}
        {activeUsers.length > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-slate-400">
            <UsersIcon />
            <span>{activeUsers.length}</span>
          </div>
        )}

        {/* Switch room */}
        {room && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSwitchRoom}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] hover:bg-violet-500/10 hover:border-violet-500/20 text-xs text-slate-400 hover:text-violet-400 transition-all"
          >
            <SwapIcon />
            <span className="hidden sm:inline">Switch Room</span>
          </motion.button>
        )}
      </div>
    </div>
  )
}

const MenuIcon = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {open ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </>
    ) : (
      <>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </>
    )}
  </svg>
)
const HashIcon = ({ className }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
)
const UsersIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const SwapIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
  </svg>
)
