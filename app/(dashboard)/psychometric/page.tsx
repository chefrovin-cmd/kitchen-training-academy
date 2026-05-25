'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'

export default function PsychometricPage() {
  const tests = [
    {
      id: 1,
      name: 'Leadership Readiness Assessment',
      description: 'Evaluate your leadership potential and management capabilities',
      duration: '15 mins',
      questions: 30,
      status: 'available',
    },
    {
      id: 2,
      name: 'Chef Personality Profile',
      description: 'Discover your culinary personality type and work style',
      duration: '20 mins',
      questions: 40,
      status: 'available',
    },
    {
      id: 3,
      name: 'Stress Management & Resilience',
      description: 'Assess your ability to handle kitchen pressure and stress',
      duration: '18 mins',
      questions: 35,
      status: 'available',
    },
  ]

  return (
    <div className="space-y-8 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Psychometric Tests</h1>
        <p className="text-muted-foreground">
          Understand your personality, strengths, and professional development areas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <CardTitle className="text-lg">{test.name}</CardTitle>
              <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">{test.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions</span>
                  <span className="font-semibold">{test.questions}</span>
                </div>
              </div>
              <Button className="w-full">
                <Brain className="w-4 h-4 mr-2" />
                Start Test
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Psychometric Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Our psychometric assessments are designed by Chef Rovin Dhar in collaboration with
            organizational psychology experts. These tests help you understand your personality,
            leadership style, and readiness for advancement in your culinary career. Your results
            are confidential and used only for your professional development.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
