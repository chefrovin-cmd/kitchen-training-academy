'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy } from 'lucide-react'

export default function LeaderboardPage() {
  const leaderboard = [
    { rank: 1, name: 'Rajesh Kumar', points: 8950, level: 'Executive Chef', badge: '🥇' },
    { rank: 2, name: 'Priya Singh', points: 8650, level: 'Senior Chef', badge: '🥈' },
    { rank: 3, name: 'Amit Patel', points: 8320, level: 'Senior Chef', badge: '🥉' },
    { rank: 4, name: 'Neha Sharma', points: 7980, level: 'Junior Chef', badge: '' },
    { rank: 5, name: 'Vikram Desai', points: 7650, level: 'Junior Chef', badge: '' },
    { rank: 6, name: 'Ananya Dey', points: 7220, level: 'Trainee', badge: '' },
    { rank: 7, name: 'Sanjay Singh', points: 6890, level: 'Trainee', badge: '' },
    { rank: 8, name: 'Deepika Roy', points: 6540, level: 'Trainee', badge: '' },
  ]

  return (
    <div className="space-y-8 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">
          See where you stand among your peers. Keep learning to climb the ranks!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 3 */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaderboard.slice(0, 3).map((entry) => (
              <Card key={entry.rank} className="text-center">
                <CardHeader>
                  <div className="text-4xl font-bold mb-2">{entry.badge}</div>
                  <CardTitle>{entry.name}</CardTitle>
                  <CardDescription>{entry.level}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{entry.points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Top Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-lg font-bold text-primary w-8 text-center">
                        {entry.rank}
                      </span>
                      <div>
                        <p className="font-semibold">{entry.name}</p>
                        <p className="text-xs text-muted-foreground">{entry.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{entry.points}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • <span className="font-semibold text-foreground">Complete Courses:</span> Earn points for finishing modules
          </p>
          <p>
            • <span className="font-semibold text-foreground">Pass Exams:</span> Bonus points for high scores
          </p>
          <p>
            • <span className="font-semibold text-foreground">Unlock Badges:</span> Achieve milestones to earn badges
          </p>
          <p>
            • <span className="font-semibold text-foreground">Daily Streaks:</span> Points for consistent learning
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
