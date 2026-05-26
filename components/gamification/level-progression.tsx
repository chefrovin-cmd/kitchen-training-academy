'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrendingUp } from 'lucide-react'

interface LevelInfo {
  level: number
  title: string
  currentPoints: number
  pointsRequired: number
  percentage: number
  benefits: string[]
}

const levels: LevelInfo[] = [
  {
    level: 1,
    title: 'Trainee',
    currentPoints: 0,
    pointsRequired: 500,
    percentage: 0,
    benefits: ['Basic course access', 'Learning dashboard'],
  },
  {
    level: 2,
    title: 'Junior Chef',
    currentPoints: 650,
    pointsRequired: 1500,
    percentage: 65,
    benefits: ['All Trainee benefits', 'Recipe creation', 'Exam attempts'],
  },
  {
    level: 3,
    title: 'Senior Chef',
    currentPoints: 2450,
    pointsRequired: 3000,
    percentage: 82,
    benefits: ['All Junior benefits', 'Mentor access', 'Advanced courses'],
  },
]

export function LevelProgression() {
  const currentLevel = levels[1] // Junior Chef

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Level Progress
        </CardTitle>
        <CardDescription>Advance through levels by earning points</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Level */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-lg font-semibold">{currentLevel.title}</h3>
              <span className="text-2xl font-bold text-primary">Level {currentLevel.level}</span>
            </div>
            <Progress value={currentLevel.percentage} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {currentLevel.currentPoints} / {currentLevel.pointsRequired} points
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Current Benefits</p>
            <ul className="space-y-1">
              {currentLevel.benefits.map((benefit) => (
                <li key={benefit} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next Level Preview */}
        <div className="border-t pt-4">
          <p className="text-sm font-semibold mb-3">Next Level: Senior Chef</p>
          <div className="p-3 bg-accent/10 rounded-lg space-y-2">
            <p className="text-sm text-muted-foreground">
              Earn <span className="font-semibold text-accent">550 more points</span> to reach the next level
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Unlock mentor access</li>
              <li>• Access advanced courses</li>
              <li>• Exclusive badge opportunities</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
