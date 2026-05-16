'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const PRESET_ROOMS = [
  { name: 'general', icon: '🌐', desc: 'Global conversations' },
  { name: 'design', icon: '🎨', desc: 'UI/UX & creative talks' },
  { name: 'dev', icon: '💻', desc: 'Code & engineering' },
  { name: 'random', icon: '🎲', desc: 'Off-topic & fun' },
  { name: 'music', icon: '🎵', desc: 'Beats & playlists' },
  { name: 'gaming', icon: '🎮', desc: 'Games & streams' },
]

export default function RoomModal({ onJoin, currentRoom }) {
  const [roomInput, setRoomInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState('')

  const handleJoin = async (roomName) => {
    const name = roomName || roomInput.trim()
    if (!name) return
    setLoading(true)
    await onJoin(name)
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-lg glass-card p-8 z-10"
      >
        {/* Glow accents */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-sky-600/15 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <HashIcon />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-white">Join a Room</h2>
            <p className="text-slate-400 text-sm">Pick a channel or create your own</p>
          </div>
        </div>

        {/* Preset rooms */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {PRESET_ROOMS.map((room) => (
            <motion.button
              key={room.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelected(room.name)
                setRoomInput(room.name)
              }}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                selected === room.name
                  ? 'bg-violet-500/15 border-violet-500/40 text-white'
                  : 'bg-white/[0.03] border-white/[0.06] text-slate-300 hover:bg-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              <span className="text-xl flex-shrink-0">{room.icon}</span>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">#{room.name}</p>
                <p className="text-xs text-slate-500 truncate">{room.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-xs text-slate-600 uppercase tracking-widest">or enter name</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Custom input */}
        <div className="relative mb-4">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
            <HashIcon />
          </div>
          <input
            type="text"
            value={roomInput}
            onChange={(e) => {
              setRoomInput(e.target.value)
              setSelected('')
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            placeholder="my-custom-room"
            className="input-field pl-10"
            maxLength={30}
          />
        </div>

        {/* Join button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => handleJoin()}
          disabled={!roomInput.trim() || loading}
          className="btn-gradient w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <SpinnerIcon />
              Joining...
            </>
          ) : (
            <>
              <span>Enter Room</span>
              <ArrowIcon />
            </>
          )}
        </motion.button>

        {currentRoom && (
          <p className="text-center text-xs text-slate-500 mt-3">
            Currently in <span className="text-violet-400">#{currentRoom}</span>
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}

const HashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
)
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)
const SpinnerIcon = () => (
  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
)
