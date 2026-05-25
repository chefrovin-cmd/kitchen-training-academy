'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      name: 'FSSAI Fundamentals',
      description: 'Learn food safety standards and regulations',
      image: '/images/kitchens/commercial-kitchen-1.jpg',
      progress: 65,
      level: 'Beginner',
    },
    {
      id: 2,
      name: 'Advanced Knife Skills',
      description: 'Master professional knife techniques',
      image: '/images/kitchens/commercial-kitchen-1.jpg',
      progress: 40,
      level: 'Intermediate',
    },
    {
      id: 3,
      name: 'Food Safety Mastery',
      description: 'Advanced food safety and hygiene',
      image: '/images/kitchens/commercial-kitchen-1.jpg',
      progress: 90,
      level: 'Advanced',
    },
  ]

  return (
    <div className="space-y-8 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Courses</h1>
        <p className="text-muted-foreground">
          Continue your culinary education with curated courses from Chef Rovin Dhar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={course.image}
                alt={course.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                <span className="text-xs font-semibold text-white bg-primary/80 px-2 py-1 rounded">
                  {course.level}
                </span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{course.name}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-semibold">{course.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              <Button className="w-full">
                <BookOpen className="w-4 h-4 mr-2" />
                {course.progress === 100 ? 'Review' : 'Continue'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
