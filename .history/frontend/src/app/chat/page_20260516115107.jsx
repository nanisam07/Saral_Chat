'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { messagesAPI } from '@/lib/api'
import { connectSocket, disconnectSocket, joinRoom, sendMessage, onReceiveMessage, onActiveUsers } from '@/lib/socket'
import { format, isToday, isYesterday } from 'date-fns'
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
  const [showRoomModal, setShowRoomModal] = useState(true)
  const [messages, setMessages] = useState([])
  const [activeUsers, setActiveUsers] = useState([])
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [connected, setConnected] = useState(false)

  // Redirect if unauthenticated
  useEffect(() => {
    if (!loading && !user) router.replace('/login')
  }, [user, loading, router])

  // Setup socket
  useEffect(() => {
    if (!user) return

    const socket = connectSocket(user.username)

    socket.on('connect', () => {
      setConnected(true)
    })
    socket.on('disconnect', () => {
      setConnected(false)
    })

    onReceiveMessage((msg) => {
      setMessages((prev) => [...prev, {
        id: Date.now() + Math.random(),
        attributes: {
          text: msg.text,
          username: msg.username,
          room: msg.room,
          createdAt: msg.createdAt || new Date().toISOString(),
        },
      }])
    })

    onActiveUsers((users) => {
      setActiveUsers(Array.isArray(users) ? users : [])
    })

    return () => {
      disconnectSocket()
    }
  }, [user])

  // Join room handler
  const handleJoinRoom = useCallback(async (roomName) => {
    if (!roomName.trim() || !user) return
    setLoadingMessages(true)
    try {
      setRoom(roomName.trim())
      setMessages([])
      joinRoom(roomName.trim(), user.username)
      const msgs = await messagesAPI.getByRoom(roomName.trim())
      setMessages(msgs)
      setShowRoomModal(false)
    } catch (err) {
      toast.error('Failed to join room')
      console.error(err)
    } finally {
      setLoadingMessages(false)
    }
  }, [user])

  // Switch room
  const handleSwitchRoom = useCallback(() => {
    setShowRoomModal(true)
    setMessages([])
    setRoom('')
  }, [])

  // Send message
  const handleSend = useCallback(async (text) => {
    if (!text.trim() || !room || !user) return
    try {
      sendMessage(room, user.username, text.trim())
      await messagesAPI.create(text.trim(), user.username, room)
    } catch (err) {
      toast.error('Failed to send message')
      console.error(err)
    }
  }, [room, user])

  if (loading || !user) {
    return <LoadingScreen />
  }

  return (
    <div className="h-screen bg-void-950 flex overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-violet-800/10 -top-40 -left-40 animate-[glowPulse_8s_ease-in-out_infinite]" />
        <div className="glow-orb w-[400px] h-[400px] bg-sky-700/08 -bottom-20 -right-20 animate-[glowPulse_10s_ease-in-out_infinite_2s]" />
      </div>

      {/* Room Modal */}
      <AnimatePresence>
        {showRoomModal && (
          <RoomModal onJoin={handleJoinRoom} currentRoom={room} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar
            activeUsers={activeUsers}
            currentRoom={room}
            username={user.username}
            connected={connected}
            onSwitchRoom={handleSwitchRoom}
          />
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Chat Header */}
        <ChatHeader
          room={room}
          connected={connected}
          activeUsers={activeUsers}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          onSwitchRoom={handleSwitchRoom}
        />

        {/* Messages */}
        <MessageList
          messages={messages}
          currentUser={user.username}
          loading={loadingMessages}
          room={room}
        />

        {/* Input */}
        <MessageInput onSend={handleSend} disabled={!room} />
      </div>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="h-screen bg-void-950 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-12 h-12 rounded-2xl animated-border flex items-center justify-center bg-void-900">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V15C19 16.1046 18.1046 17 17 17H14L10 21V17H7C5.89543 17 5 16.1046 5 15V7Z"
              stroke="url(#lg)" strokeWidth="1.5" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="lg" x1="5" y1="5" x2="19" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a78bfa"/><stop offset="1" stopColor="#38bdf8"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-500"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
