'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Trophy, Lock, CheckCircle2 } from 'lucide-react'

interface BadgeItem {
  id: string
  name: string
  description: string
  icon: string
  color: string
  unlockedAt?: Date
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

const badgeDefinitions: BadgeItem[] = [
  {
    id: 'food-safety-master',
    name: 'Food Safety Master',
    description: 'Complete the FSSAI course with 90%+ score',
    icon: '🛡️',
    color: 'bg-blue-500',
    unlocked: true,
    rarity: 'epic',
    unlockedAt: new Date('2024-01-15'),
  },
  {
    id: 'knife-skills-expert',
    name: 'Knife Skills Expert',
    description: 'Master advanced knife techniques',
    icon: '🔪',
    color: 'bg-orange-500',
    unlocked: true,
    rarity: 'rare',
    unlockedAt: new Date('2024-01-20'),
  },
  {
    id: 'recipe-creator',
    name: 'Recipe Creator',
    description: 'Save 10 personal recipes',
    icon: '👨‍🍳',
    color: 'bg-green-500',
    unlocked: false,
    rarity: 'common',
  },
  {
    id: 'exam-champion',
    name: 'Exam Champion',
    description: 'Score 95% or higher on any exam',
    icon: '🏆',
    color: 'bg-yellow-500',
    unlocked: false,
    rarity: 'epic',
  },
  {
    id: 'consistency-king',
    name: 'Consistency King',
    description: 'Maintain a 30-day learning streak',
    icon: '🔥',
    color: 'bg-red-500',
    unlocked: false,
    rarity: 'legendary',
  },
  {
    id: 'team-player',
    name: 'Team Player',
    description: 'Share 5 recipes with colleagues',
    icon: '🤝',
    color: 'bg-purple-500',
    unlocked: false,
    rarity: 'rare',
  },
]

export function BadgeShowcase() {
  const [badges, setBadges] = useState<BadgeItem[]>(badgeDefinitions)

  const unlockedCount = badges.filter((b) => b.unlocked).length
  const totalCount = badges.length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Achievements
        </CardTitle>
        <CardDescription>
          {unlockedCount} of {totalCount} badges unlocked
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          <TooltipProvider>
            {badges.map((badge) => (
              <Tooltip key={badge.id}>
                <TooltipTrigger asChild>
                  <div
                    className={`relative w-16 h-16 rounded-lg flex items-center justify-center text-2xl cursor-pointer transition-transform hover:scale-110 ${
                      badge.unlocked ? badge.color : 'bg-muted'
                    }`}
                  >
                    {badge.icon}
                    {!badge.unlocked && (
                      <Lock className="w-4 h-4 absolute top-1 right-1 text-muted-foreground" />
                    )}
                    {badge.unlocked && (
                      <CheckCircle2 className="w-4 h-4 absolute -top-1 -right-1 text-green-500 bg-white rounded-full" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-xs text-muted-foreground max-w-xs">{badge.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs capitalize">
                      {badge.rarity}
                    </Badge>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
