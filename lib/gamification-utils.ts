import { User, Badge, UserProgress } from './types'

// Level thresholds for progression
const LEVEL_THRESHOLDS = {
  1: { title: 'Trainee', minPoints: 0, maxPoints: 500 },
  2: { title: 'Junior Chef', minPoints: 500, maxPoints: 1500 },
  3: { title: 'Senior Chef', minPoints: 1500, maxPoints: 3000 },
  4: { title: 'Head Chef', minPoints: 3000, maxPoints: 5000 },
  5: { title: 'Executive Chef', minPoints: 5000, maxPoints: Infinity },
}

export function calculateLevel(points: number): { level: number; title: string; progress: number } {
  for (const [level, threshold] of Object.entries(LEVEL_THRESHOLDS)) {
    const levelNum = parseInt(level)
    if (points >= threshold.minPoints && points < threshold.maxPoints) {
      const progress = ((points - threshold.minPoints) / (threshold.maxPoints - threshold.minPoints)) * 100
      return {
        level: levelNum,
        title: threshold.title,
        progress: Math.min(progress, 100),
      }
    }
  }
  return { level: 5, title: 'Executive Chef', progress: 100 }
}

export function calculateNextLevelPoints(currentPoints: number): number {
  for (const threshold of Object.values(LEVEL_THRESHOLDS)) {
    if (currentPoints < threshold.maxPoints) {
      return threshold.maxPoints - currentPoints
    }
  }
  return 0
}

// Badge unlock conditions
export const BADGE_CONDITIONS = {
  'food-safety-master': (progress: UserProgress) =>
    progress.completedLessons?.some(id => id.includes('food-safety')) && true,
  'knife-skills-expert': (progress: UserProgress) =>
    progress.completedLessons?.some(id => id.includes('knife')) && true,
  'recipe-creator': () => true,
  'exam-champion': () => true,
  'consistency-king': (progress: UserProgress) => progress.completionPercentage >= 30,
  'team-player': () => true,
}

export function checkBadgeUnlock(badgeId: string, progress: UserProgress): boolean {
  const condition = BADGE_CONDITIONS[badgeId as keyof typeof BADGE_CONDITIONS]
  return condition ? condition(progress) : false
}

export function calculateStreak(lastLoginDate: Date, currentDate: Date = new Date()): number {
  const daysDiff = Math.floor((currentDate.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24))
  return daysDiff <= 1 ? 1 : 0
}

export function getPointsForActivity(activity: string, metadata?: any): number {
  const pointsMap: { [key: string]: number } = {
    'course-completion': 100,
    'exam-pass': 150,
    'badge-unlock': 200,
    'lesson-completion': 25,
    'recipe-save': 15,
    'recipe-share': 30,
    'daily-login': 10,
    'quiz-complete': 50,
  }
  return pointsMap[activity] || 0
}

export interface LeaderboardEntry {
  userId: string
  name: string
  points: number
  level: number
  levelTitle: string
  badge: string
  rank: number
}

export function calculateLeaderboardRank(users: (User & { points: number })[]): LeaderboardEntry[] {
  return users
    .sort((a, b) => b.points - a.points)
    .map((user, index) => {
      const levelInfo = calculateLevel(user.points)
      return {
        userId: user.uid,
        name: user.displayName,
        points: user.points,
        level: levelInfo.level,
        levelTitle: levelInfo.title,
        badge: getRankBadge(index),
        rank: index + 1,
      }
    })
}

function getRankBadge(rank: number): string {
  if (rank === 0) return '🥇'
  if (rank === 1) return '🥈'
  if (rank === 2) return '🥉'
  return ''
}
