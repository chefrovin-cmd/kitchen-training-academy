'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { authService } from './auth-service'
import { User, AuthContextType, UserRole } from './types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state
  useEffect(() => {
    try {
      // Check for demo session cookie
      const sessionCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('__session='))
      
      if (sessionCookie) {
        const email = atob(sessionCookie.split('=')[1])
        setUser({
          uid: email,
          email,
          name: email.split('@')[0],
          role: 'staff',
          joinedAt: new Date(),
        } as User)
      }
      setLoading(false)
    } catch (err) {
      console.warn('[v0] Demo auth initialization')
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      await authService.login(email, password)
      // User state will be updated by onAuthStateChanged listener
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, displayName: string) => {
    try {
      setError(null)
      setLoading(true)
      await authService.signup(email, password, displayName)
      // User state will be updated by onAuthStateChanged listener
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setError(null)
      setLoading(true)
      // Clear demo session cookie
      document.cookie = '__session=; path=/; max-age=0'
      setUser(null)
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (uid: string, role: UserRole) => {
    try {
      setError(null)
      await authService.updateUserRole(uid, role)
      // Refresh user data if updating current user
      if (user?.uid === uid) {
        const updated = await authService.getUserData(uid)
        if (updated) setUser(updated)
      }
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
