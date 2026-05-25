// User roles in the system
export enum UserRole {
  ADMIN = 'admin',
  CHEF = 'chef',
  EXECUTIVE_CHEF = 'executive_chef',
  TRAINER = 'trainer',
  STAFF = 'staff',
  KITCHEN_MANAGER = 'kitchen_manager',
  SUPER_ADMIN = 'super_admin',
}

// User types
export interface User {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  role: UserRole
  phoneNumber?: string
  department?: string
  joinedAt: Date
  lastLoginAt?: Date
  isActive: boolean
  completedCourses: string[]
  currentPoints: number
  level: number
  badges: string[]
  streakDays: number
  lastActivityDate?: Date
}

// Auth context type
export interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  updateUserRole: (uid: string, role: UserRole) => Promise<void>
}

// Firestore Collections
export interface Course {
  id: string
  title: string
  description: string
  image: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: number // in minutes
  lessons: Lesson[]
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface Lesson {
  id: string
  title: string
  description: string
  videoUrl?: string
  content: string
  duration: number // in minutes
  order: number
  resources?: string[]
}

export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  ingredients: Ingredient[]
  steps: CookingStep[]
  prepTime: number
  cookTime: number
  servings: number
  difficulty: 'easy' | 'medium' | 'hard'
  cuisine: string
  tags: string[]
  createdBy: string
  createdAt: Date
}

export interface Ingredient {
  name: string
  quantity: number
  unit: string
}

export interface CookingStep {
  step: number
  instruction: string
  image?: string
  duration?: number
}

export interface Exam {
  id: string
  title: string
  description: string
  passingScore: number
  totalQuestions: number
  duration: number // in minutes
  questions: ExamQuestion[]
  createdAt: Date
  createdBy: string
}

export interface ExamQuestion {
  id: string
  type: 'multiple_choice' | 'image_based' | 'true_false'
  question: string
  image?: string
  options: string[]
  correctAnswer: number
  points: number
}

export interface ExamAttempt {
  id: string
  userId: string
  examId: string
  startedAt: Date
  completedAt?: Date
  score?: number
  passed?: boolean
  answers: { questionId: string; answer: number }[]
}

export interface PsychometricTest {
  id: string
  title: string
  description: string
  category: 'personality' | 'leadership' | 'stress_management'
  questions: PsychometricQuestion[]
  createdAt: Date
}

export interface PsychometricQuestion {
  id: string
  question: string
  scale: number // e.g., 1-5
  category: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  points: number
  category: string
  unlockedAt?: Date
}

export interface UserProgress {
  userId: string
  courseId: string
  completedLessons: string[]
  currentLessonId?: string
  completionPercentage: number
  startedAt: Date
  completedAt?: Date
}

export interface LeaderboardEntry {
  userId: string
  displayName: string
  photoURL?: string
  totalPoints: number
  level: number
  badgesCount: number
  rank: number
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'achievement' | 'course' | 'exam' | 'system'
  read: boolean
  createdAt: Date
  actionUrl?: string
}

export interface PsychometricResult {
  id: string
  userId: string
  testId: string
  completedAt: Date
  scores: { category: string; score: number }[]
  profileType?: string
  recommendations?: string[]
}
