'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { messagesAPI } from '@/lib/api'
import socket from '@/lib/socket'
import toast from 'react-hot-toast'

// Components
import RoomModal from '@/components/chat/RoomModal'
import Sidebar from '@/components/chat/Sidebar'
import ChatHeader from '@/components/chat/ChatHeader'
import MessageList from '@/components/chat/MessageList'
import MessageInput from '@/components/chat/MessageInput'

export default function ChatPage() {
  const { user, loading } = useAuth()

  const router = useRouter()

  const [room, setRoom] = useState('')
  const [showRoomModal, setShowRoomModal] =
    useState(true)

  const [messages, setMessages] = useState([])
  const [activeUsers, setActiveUsers] =
    useState([])

  const [loadingMessages, setLoadingMessages] =
    useState(false)

  const [sidebarOpen, setSidebarOpen] =
    useState(true)

  const [connected, setConnected] =
    useState(false)

  // REDIRECT
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  // SOCKET SETUP
  useEffect(() => {
    if (!user) return

    socket.on('connect', () => {
      setConnected(true)
    })

    socket.on('disconnect', () => {
      setConnected(false)
    })

    socket.on(
      'receive_message',
      (msg) => {
        setMessages((prev) => [
  ...prev,
  {
    id:
      Date.now() +
      Math.random(),

    text: msg.text,
    username:
      msg.username,
    room: msg.room,
    createdAt:
      new Date().toISOString(),
  },
])
      }
    )

    socket.on(
      'active_users',
      (users) => {
        setActiveUsers(
          Array.isArray(users)
            ? users
            : []
        )
      }
    )

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('receive_message')
      socket.off('active_users')
    }
  }, [user])

  // JOIN ROOM
  const handleJoinRoom =
    useCallback(
      async (roomName) => {
        if (
          !roomName.trim() ||
          !user
        )
          return

        setLoadingMessages(true)

        try {
  const cleanRoom =
    roomName.trim()

  setRoom(cleanRoom)

  setMessages([])

  // SOCKET JOIN
  socket.emit(
    'join_room',
    {
      room: cleanRoom,
      username:
        user.username,
    }
  )

  // LOAD OLD MESSAGES
  const msgs =
    await messagesAPI.getByRoom(
      cleanRoom
    )

 const formatted =
  msgs.map((msg) => ({
    id: msg.id,

    text:
      msg.text ||
      msg.attributes?.text,

    username:
      msg.username ||
      msg.attributes
        ?.username,

    room:
      msg.room ||
      msg.attributes?.room,

    createdAt:
      msg.createdAt ||
      msg.attributes
        ?.createdAt,
  }))

setMessages(formatted)

  setShowRoomModal(false)

  toast.success(
    `Joined ${cleanRoom}`
  )

        } catch (err) {
          console.error(err)

          toast.error(
            'Failed to join room'
          )
        } finally {
          setLoadingMessages(false)
        }
      },
      [user]
    )

  // SWITCH ROOM
  const handleSwitchRoom =
    useCallback(() => {
      setShowRoomModal(true)
      setMessages([])
      setRoom('')
    }, [])

  // SEND MESSAGE
  const handleSend =
    useCallback(
      async (text) => {
        if (
          !text.trim() ||
          !room ||
          !user
        )
          return

        try {
          const msgData = {
            room,
            username:
              user.username,
            text: text.trim(),
          }

          // SOCKET EMIT
          socket.emit(
            'send_message',
            msgData
          )

          // SAVE TO STRAPI
          await messagesAPI.create(
            text.trim(),
            user.username,
            room
          )
        } catch (err) {
          console.error(err)

          toast.error(
            'Failed to send message'
          )
        }
      },
      [room, user]
    )

  if (loading || !user) {
    return <LoadingScreen />
  }

  return (
  <div className="h-screen overflow-hidden bg-[#030712] text-white flex relative">
    {/* PREMIUM BACKGROUND */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient blobs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-violet-700/20 rounded-full blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[140px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-fuchsia-500/10 rounded-full blur-[120px]"
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>

    {/* ROOM MODAL */}
    <AnimatePresence>
      {showRoomModal && (
        <RoomModal
          onJoin={handleJoinRoom}
          currentRoom={room}
        />
      )}
    </AnimatePresence>

    {/* SIDEBAR */}
    <AnimatePresence>
      {sidebarOpen && (
        <motion.div
          initial={{
            x: -100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: -100,
            opacity: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className="relative z-20"
        >
          <Sidebar
            activeUsers={activeUsers}
            currentRoom={room}
            username={user.username}
            connected={connected}
            onSwitchRoom={
              handleSwitchRoom
            }
          />
        </motion.div>
      )}
    </AnimatePresence>

    {/* MAIN CHAT AREA */}
    <div className="flex-1 flex flex-col relative z-10 min-w-0">
      {/* TOP SHADOW */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10" />

      {/* HEADER */}
      <motion.div
        initial={{
          y: -30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <ChatHeader
          room={room}
          connected={connected}
          activeUsers={activeUsers}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() =>
            setSidebarOpen(
              (v) => !v
            )
          }
          onSwitchRoom={
            handleSwitchRoom
          }
        />
      </motion.div>

      {/* CHAT BODY */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.2,
          duration: 0.6,
        }}
        className="flex-1 overflow-hidden relative"
      >
        {/* FLOATING LIGHT */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] h-[120px] bg-violet-500/10 blur-[90px] rounded-full pointer-events-none" />

        <MessageList
          messages={messages}
          currentUser={
            user.username
          }
          loading={
            loadingMessages
          }
          room={room}
        />
      </motion.div>

      {/* INPUT AREA */}
      <motion.div
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative z-20 backdrop-blur-xl bg-black/20 border-t border-white/5"
      >
        {/* Glow line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <MessageInput
          onSend={handleSend}
          disabled={!room}
        />
      </motion.div>
    </div>

    {/* FLOATING BRAND */}
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="hidden xl:flex absolute bottom-6 right-6 z-30"
    >
      <div className="px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.2)]">
        <p className="text-sm tracking-[0.3em] uppercase text-slate-500">
          Saral Chat Workspace
        </p>

        <p className="text-violet-300 italic text-lg font-semibold">
          “Connect Beyond Boundaries”
        </p>
      </div>
    </motion.div>
  </div>
)}
function LoadingScreen() {

  return (
    <div className="h-screen bg-[#030712] flex items-center justify-center overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[140px]" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* LOGO */}
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-sky-500 p-[1px] shadow-[0_0_80px_rgba(139,92,246,0.45)]"
        >
          <div className="w-full h-full rounded-[28px] bg-[#050816] flex items-center justify-center">
            <span className="text-5xl font-black italic bg-gradient-to-r from-violet-300 to-sky-300 text-transparent bg-clip-text">
              S
            </span>
          </div>
        </motion.div>

        {/* BRAND */}
        <motion.h1
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-8 text-4xl font-black italic bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 text-transparent bg-clip-text"
        >
          Saral Chat
        </motion.h1>

        <p className="text-slate-500 mt-2 tracking-[0.3em] uppercase text-sm">
          Initializing Realtime Workspace
        </p>

        {/* LOADER */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              className="w-3 h-3 rounded-full bg-violet-400"
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}