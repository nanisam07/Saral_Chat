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
    <div className="h-screen bg-black flex overflow-hidden relative">
      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] -top-40 -left-40" />

        <div className="absolute w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] -bottom-20 -right-20" />
      </div>

      {/* ROOM MODAL */}
      <AnimatePresence>
        {showRoomModal && (
          <RoomModal
            onJoin={
              handleJoinRoom
            }
            currentRoom={room}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar
            activeUsers={
              activeUsers
            }
            currentRoom={room}
            username={
              user.username
            }
            connected={
              connected
            }
            onSwitchRoom={
              handleSwitchRoom
            }
          />
        )}
      </AnimatePresence>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <ChatHeader
          room={room}
          connected={
            connected
          }
          activeUsers={
            activeUsers
          }
          sidebarOpen={
            sidebarOpen
          }
          onToggleSidebar={() =>
            setSidebarOpen(
              (v) => !v
            )
          }
          onSwitchRoom={
            handleSwitchRoom
          }
        />

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

        <MessageInput
          onSend={handleSend}
          disabled={!room}
        />
      </div>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-12 h-12 rounded-2xl border border-violet-500/20 flex items-center justify-center bg-zinc-900">
          <div className="w-4 h-4 rounded-full bg-violet-500 animate-pulse" />
        </div>

        <p className="text-zinc-400 text-sm">
          Loading workspace...
        </p>
      </motion.div>
    </div>
  )
}