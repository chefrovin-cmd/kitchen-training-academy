import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  QueryConstraint,
  orderBy,
  limit,
  DocumentData,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import { User, Course, Recipe, Exam, Badge, PsychometricTest, UserProgress, ExamAttempt } from './types'

// User operations
export async function createUser(userId: string, userData: Partial<User>) {
  try {
    const userRef = doc(db, 'users', userId)
    await setDoc(userRef, {
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export async function getUser(userId: string): Promise<User | null> {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)
    return userSnap.exists() ? (userSnap.data() as User) : null
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

export async function updateUser(userId: string, updates: Partial<User>) {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

// Course operations
export async function getCourses(
  constraints: QueryConstraint[] = []
): Promise<Course[]> {
  try {
    const coursesRef = collection(db, 'courses')
    const q = query(coursesRef, ...constraints)
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[]
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw error
  }
}

export async function getCourse(courseId: string): Promise<Course | null> {
  try {
    const courseRef = doc(db, 'courses', courseId)
    const courseSnap = await getDoc(courseRef)
    return courseSnap.exists()
      ? ({ id: courseSnap.id, ...courseSnap.data() } as Course)
      : null
  } catch (error) {
    console.error('Error fetching course:', error)
    throw error
  }
}

export async function createCourse(courseData: Partial<Course>) {
  try {
    const coursesRef = collection(db, 'courses')
    const docRef = doc(coursesRef)
    await setDoc(docRef, {
      ...courseData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

// Recipe operations
export async function getRecipes(constraints: QueryConstraint[] = []): Promise<Recipe[]> {
  try {
    const recipesRef = collection(db, 'recipes')
    const q = query(recipesRef, ...constraints)
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[]
  } catch (error) {
    console.error('Error fetching recipes:', error)
    throw error
  }
}

export async function getRecipe(recipeId: string): Promise<Recipe | null> {
  try {
    const recipeRef = doc(db, 'recipes', recipeId)
    const recipeSnap = await getDoc(recipeRef)
    return recipeSnap.exists()
      ? ({ id: recipeSnap.id, ...recipeSnap.data() } as Recipe)
      : null
  } catch (error) {
    console.error('Error fetching recipe:', error)
    throw error
  }
}

// Badge operations
export async function getBadges(): Promise<Badge[]> {
  try {
    const badgesRef = collection(db, 'badges')
    const snapshot = await getDocs(badgesRef)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Badge[]
  } catch (error) {
    console.error('Error fetching badges:', error)
    throw error
  }
}

// User progress operations
export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  try {
    const progressRef = doc(db, 'userProgress', userId)
    const progressSnap = await getDoc(progressRef)
    return progressSnap.exists() ? (progressSnap.data() as UserProgress) : null
  } catch (error) {
    console.error('Error fetching user progress:', error)
    throw error
  }
}

export async function updateUserProgress(userId: string, updates: Partial<UserProgress>) {
  try {
    const progressRef = doc(db, 'userProgress', userId)
    const existing = await getDoc(progressRef)

    if (existing.exists()) {
      await updateDoc(progressRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      })
    } else {
      await setDoc(progressRef, {
        userId,
        ...updates,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
    }
  } catch (error) {
    console.error('Error updating user progress:', error)
    throw error
  }
}

// Exam operations
export async function getExams(constraints: QueryConstraint[] = []): Promise<Exam[]> {
  try {
    const examsRef = collection(db, 'exams')
    const q = query(examsRef, ...constraints)
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Exam[]
  } catch (error) {
    console.error('Error fetching exams:', error)
    throw error
  }
}

export async function getExam(examId: string): Promise<Exam | null> {
  try {
    const examRef = doc(db, 'exams', examId)
    const examSnap = await getDoc(examRef)
    return examSnap.exists()
      ? ({ id: examSnap.id, ...examSnap.data() } as Exam)
      : null
  } catch (error) {
    console.error('Error fetching exam:', error)
    throw error
  }
}

// Exam attempt operations
export async function createExamAttempt(
  userId: string,
  examId: string,
  attemptData: Partial<ExamAttempt>
) {
  try {
    const attemptsRef = collection(db, 'examAttempts')
    const docRef = doc(attemptsRef)
    await setDoc(docRef, {
      userId,
      examId,
      ...attemptData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating exam attempt:', error)
    throw error
  }
}

export async function getUserExamAttempts(userId: string): Promise<ExamAttempt[]> {
  try {
    const attemptsRef = collection(db, 'examAttempts')
    const q = query(
      attemptsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ExamAttempt[]
  } catch (error) {
    console.error('Error fetching exam attempts:', error)
    throw error
  }
}

// Leaderboard operations
export async function getLeaderboard(limit_: number = 100): Promise<(User & { points: number })[]> {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, orderBy('points', 'desc'), limit(limit_))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (User & { points: number })[]
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    throw error
  }
}

// Psychometric test operations
export async function getPsychometricTests(): Promise<PsychometricTest[]> {
  try {
    const testsRef = collection(db, 'psychometricTests')
    const snapshot = await getDocs(testsRef)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PsychometricTest[]
  } catch (error) {
    console.error('Error fetching psychometric tests:', error)
    throw error
  }
}

export async function getPsychometricTest(testId: string): Promise<PsychometricTest | null> {
  try {
    const testRef = doc(db, 'psychometricTests', testId)
    const testSnap = await getDoc(testRef)
    return testSnap.exists()
      ? ({ id: testSnap.id, ...testSnap.data() } as PsychometricTest)
      : null
  } catch (error) {
    console.error('Error fetching psychometric test:', error)
    throw error
  }
}
