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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setError(null)
        if (firebaseUser) {
          // Fetch user data from Firestore
          const userData = await authService.getUserData(firebaseUser.uid)
          if (userData) {
            setUser(userData)
          }
        } else {
          setUser(null)
        }
      } catch (err: any) {
        console.error('[v0] Auth state change error:', err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
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
      await authService.logout()
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
