'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChefHat, TrendingUp, Trophy, Award, Flame, BookOpen } from 'lucide-react'

interface DashboardStats {
  pointsEarned: number
  level: string
  badgesUnlocked: number
  coursesCompleted: number
  nextBadge: string
  streak: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    pointsEarned: 0,
    level: 'Trainee',
    badgesUnlocked: 0,
    coursesCompleted: 0,
    nextBadge: 'Food Safety Master',
    streak: 0,
  })

  useEffect(() => {
    // TODO: Fetch from Firebase
    setStats({
      pointsEarned: 2450,
      level: 'Junior Chef',
      badgesUnlocked: 5,
      coursesCompleted: 3,
      nextBadge: 'Food Safety Master',
      streak: 12,
    })
  }, [])

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Hero Banner with Chef Rovin Dhar */}
      <div className="relative rounded-lg overflow-hidden h-64 md:h-80">
        <Image
          src="/images/chef/chef-rovin-hero.jpg"
          alt="Chef Rovin Dhar - KitchenPro Academy"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-6 md:p-12">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="w-8 h-8 text-primary" />
              <span className="text-white text-sm font-semibold">Curated by Chef Rovin Dhar</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, aspiring chef!
            </h1>
            <p className="text-white/90 text-lg">
              Continue your culinary journey with personalized training from industry experts
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Points Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>Points Earned</span>
              <Flame className="w-4 h-4 text-accent" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pointsEarned}</div>
            <p className="text-xs text-muted-foreground mt-1">+240 this week</p>
          </CardContent>
        </Card>

        {/* Level Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>Current Level</span>
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.level}</div>
            <p className="text-xs text-muted-foreground mt-1">Next: Executive Chef</p>
          </CardContent>
        </Card>

        {/* Badges Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>Badges</span>
              <Trophy className="w-4 h-4 text-secondary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.badgesUnlocked}</div>
            <p className="text-xs text-muted-foreground mt-1">Next: {stats.nextBadge}</p>
          </CardContent>
        </Card>

        {/* Streak Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>Learning Streak</span>
              <Award className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak}</div>
            <p className="text-xs text-muted-foreground mt-1">days in a row</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned Courses */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
              <CardDescription>Continue learning with assigned courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'FSSAI Fundamentals', progress: 65, image: '/images/kitchens/commercial-kitchen-1.jpg' },
                { name: 'Advanced Knife Skills', progress: 40, image: '/images/kitchens/commercial-kitchen-1.jpg' },
                { name: 'Food Safety Mastery', progress: 90, image: '/images/kitchens/commercial-kitchen-1.jpg' },
              ].map((course) => (
                <div key={course.name} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{course.name}</p>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{course.progress}% complete</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="ghost" onClick={() => router.push('/courses')}>
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Courses
              </Button>
              <Button className="w-full justify-start" variant="ghost" onClick={() => router.push('/exams')}>
                <Award className="w-4 h-4 mr-2" />
                Take Exam
              </Button>
              <Button className="w-full justify-start" variant="ghost" onClick={() => router.push('/recipes')}>
                <Flame className="w-4 h-4 mr-2" />
                View Recipes
              </Button>
              <Button className="w-full justify-start" variant="ghost" onClick={() => router.push('/leaderboard')}>
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
              <Button className="w-full justify-start mt-4" variant="default" onClick={() => router.push('/psychometric')}>
                <Flame className="w-4 h-4 mr-2" />
                Start Challenge
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Daily Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Complete today&apos;s quick quiz to earn bonus points
              </p>
              <Button className="w-full bg-accent hover:bg-accent/90">
                Start Challenge
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
