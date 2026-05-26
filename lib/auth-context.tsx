'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthContextType } from './types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kp_user')
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch (err) {
      console.warn('[v0] Auth init error')
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      if (!email || password.length < 6) {
        throw new Error('Invalid credentials')
      }
      const newUser: User = {
        uid: email,
        email,
        name: email.split('@')[0],
        role: 'staff',
        joinedAt: new Date(),
      }
      setUser(newUser)
      localStorage.setItem('kp_user', JSON.stringify(newUser))
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, displayName: string) => {
    setError(null)
    setLoading(true)
    try {
      if (!email || !displayName || password.length < 6) {
        throw new Error('Invalid details')
      }
      const newUser: User = {
        uid: email,
        email,
        name: displayName,
        role: 'staff',
        joinedAt: new Date(),
      }
      setUser(newUser)
      localStorage.setItem('kp_user', JSON.stringify(newUser))
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setError(null)
    setLoading(true)
    try {
      localStorage.removeItem('kp_user')
      setUser(null)
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
