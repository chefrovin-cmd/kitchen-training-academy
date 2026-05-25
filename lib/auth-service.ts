'use client'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Timestamp,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { auth, db } from './firebase'
import { User, UserRole } from './types'

export const authService = {
  // Create a new user account
  async signup(email: string, password: string, displayName: string) {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = credential.user

      // Update profile
      await updateProfile(firebaseUser, { displayName })

      // Create user document in Firestore
      const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || email,
        displayName,
        photoURL: '',
        role: UserRole.STAFF, // Default role
        isActive: true,
        completedCourses: [],
        currentPoints: 0,
        level: 1,
        badges: [],
        streakDays: 0,
        joinedAt: new Date(),
      }

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        ...newUser,
        joinedAt: Timestamp.fromDate(newUser.joinedAt),
      })

      return newUser
    } catch (error: any) {
      console.error('[v0] Signup error:', error.message)
      throw new Error(error.message || 'Failed to sign up')
    }
  },

  // Sign in with email and password
  async login(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = credential.user

      // Update last login time
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        lastLoginAt: Timestamp.now(),
      })

      return firebaseUser
    } catch (error: any) {
      console.error('[v0] Login error:', error.message)
      throw new Error(error.message || 'Failed to sign in')
    }
  },

  // Sign out current user
  async logout() {
    try {
      await firebaseSignOut(auth)
    } catch (error: any) {
      console.error('[v0] Logout error:', error.message)
      throw new Error(error.message || 'Failed to sign out')
    }
  },

  // Get user data from Firestore
  async getUserData(uid: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        const data = userDoc.data()
        return {
          ...data,
          joinedAt: data.joinedAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate(),
        } as User
      }
      return null
    } catch (error: any) {
      console.error('[v0] Get user data error:', error.message)
      return null
    }
  },

  // Update user role (admin only)
  async updateUserRole(uid: string, role: UserRole) {
    try {
      await updateDoc(doc(db, 'users', uid), { role })
    } catch (error: any) {
      console.error('[v0] Update role error:', error.message)
      throw new Error(error.message || 'Failed to update role')
    }
  },

  // Update user profile
  async updateUserProfile(uid: string, updates: Partial<User>) {
    try {
      const updateData: any = { ...updates }
      
      // Convert dates to Timestamps if needed
      if (updates.joinedAt) {
        updateData.joinedAt = Timestamp.fromDate(updates.joinedAt)
      }
      if (updates.lastActivityDate) {
        updateData.lastActivityDate = Timestamp.fromDate(updates.lastActivityDate)
      }

      await updateDoc(doc(db, 'users', uid), updateData)
    } catch (error: any) {
      console.error('[v0] Update profile error:', error.message)
      throw new Error(error.message || 'Failed to update profile')
    }
  },

  // Add points to user
  async addPoints(uid: string, points: number) {
    try {
      const userRef = doc(db, 'users', uid)
      const userDoc = await getDoc(userRef)
      
      if (userDoc.exists()) {
        const currentPoints = userDoc.data().currentPoints || 0
        const currentLevel = userDoc.data().level || 1
        const newPoints = currentPoints + points
        
        // Calculate new level (e.g., 1000 points per level)
        const newLevel = Math.floor(newPoints / 1000) + 1

        await updateDoc(userRef, {
          currentPoints: newPoints,
          level: newLevel,
          lastActivityDate: Timestamp.now(),
        })
      }
    } catch (error: any) {
      console.error('[v0] Add points error:', error.message)
      throw new Error(error.message || 'Failed to add points')
    }
  },

  // Add badge to user
  async addBadge(uid: string, badgeId: string) {
    try {
      const userRef = doc(db, 'users', uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        const badges = userDoc.data().badges || []
        if (!badges.includes(badgeId)) {
          await updateDoc(userRef, {
            badges: [...badges, badgeId],
            lastActivityDate: Timestamp.now(),
          })
        }
      }
    } catch (error: any) {
      console.error('[v0] Add badge error:', error.message)
      throw new Error(error.message || 'Failed to add badge')
    }
  },

  // Get users by role
  async getUsersByRole(role: UserRole) {
    try {
      const q = query(collection(db, 'users'), where('role', '==', role))
      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => ({
        ...doc.data(),
        joinedAt: doc.data().joinedAt?.toDate(),
      })) as User[]
    } catch (error: any) {
      console.error('[v0] Get users by role error:', error.message)
      return []
    }
  },
}
