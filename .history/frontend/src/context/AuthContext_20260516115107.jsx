'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    const email = localStorage.getItem('email')

    if (token && username) {
      setUser({ token, username, userId, email })
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (identifier, password) => {
    const data = await authAPI.login(identifier, password)
    const { jwt, user: userData } = data

    localStorage.setItem('jwt', jwt)
    localStorage.setItem('username', userData.username)
    localStorage.setItem('userId', userData.id)
    localStorage.setItem('email', userData.email)

    setUser({
      token: jwt,
      username: userData.username,
      userId: userData.id,
      email: userData.email,
    })

    toast.success(`Welcome back, ${userData.username}!`)
    router.push('/chat')
  }, [router])

  const register = useCallback(async (username, email, password) => {
    await authAPI.register(username, email, password)
    toast.success('Account created! Please log in.')
    router.push('/login')
  }, [router])

  const logout = useCallback(() => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    setUser(null)
    toast.success('Logged out successfully')
    router.push('/login')
  }, [router])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
