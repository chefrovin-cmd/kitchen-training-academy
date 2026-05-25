'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle, BookOpen, Clock, Users } from 'lucide-react'

interface Lesson {
  id: string
  title: string
  duration: number
  completed: boolean
  videoUrl?: string
}

const courseDetail = {
  id: 'fssai-fundamentals',
  title: 'FSSAI Fundamentals',
  description: 'Master food safety standards and food safety acts established by the Food Safety and Standards Authority of India',
  image: '/images/kitchens/commercial-kitchen-1.jpg',
  instructor: 'Chef Rovin Dhar',
  level: 'Beginner',
  duration: '8 weeks',
  students: 342,
  rating: 4.8,
  progress: 65,
  lessons: [
    {
      id: 'lesson-1',
      title: 'Introduction to FSSAI',
      duration: 15,
      completed: true,
    },
    {
      id: 'lesson-2',
      title: 'Food Safety Fundamentals',
      duration: 20,
      completed: true,
    },
    {
      id: 'lesson-3',
      title: 'Hygiene and Sanitation Standards',
      duration: 25,
      completed: true,
    },
    {
      id: 'lesson-4',
      title: 'Temperature Control and Storage',
      duration: 18,
      completed: false,
    },
    {
      id: 'lesson-5',
      title: 'Allergen Management',
      duration: 22,
      completed: false,
    },
    {
      id: 'lesson-6',
      title: 'Documentation and Record Keeping',
      duration: 20,
      completed: false,
    },
  ],
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const completedLessons = courseDetail.lessons.filter((l) => l.completed).length
  const totalLessons = courseDetail.lessons.length

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={courseDetail.image}
              alt={courseDetail.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{courseDetail.level}</Badge>
              <span className="text-sm text-muted-foreground">Curated by {courseDetail.instructor}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{courseDetail.title}</h1>
            <p className="text-lg text-muted-foreground">{courseDetail.description}</p>
          </div>

          {/* Course Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-semibold">{courseDetail.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Students</p>
                    <p className="font-semibold">{courseDetail.students}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-secondary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Lessons</p>
                    <p className="font-semibold">{totalLessons}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                  <p className="font-semibold">⭐ {courseDetail.rating}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Completion</span>
                <span className="font-semibold">{courseDetail.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{ width: `${courseDetail.progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>
            <div className="space-y-2 pt-4">
              <p className="text-sm font-semibold">Certificates Earned</p>
              <p className="text-xs text-muted-foreground">
                Complete this course to earn a certificate
              </p>
              <Button className="w-full mt-2" disabled>
                Earn Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>Course Lessons</CardTitle>
          <CardDescription>Complete lessons sequentially to earn points and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {courseDetail.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                className="w-full flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left"
              >
                <div className="flex-shrink-0">
                  {lesson.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{lesson.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Lesson {index + 1} • {lesson.duration} minutes
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  {lesson.completed ? 'Review' : 'Start'}
                </Button>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
