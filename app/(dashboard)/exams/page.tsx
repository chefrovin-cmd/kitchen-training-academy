'use client'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

export default function ExamsPage() {
  const exams = [
    {
      id: 1,
      name: 'FSSAI Certification Exam',
      description: 'Test your food safety knowledge',
      questions: 50,
      passingScore: 70,
      status: 'available',
      image: '/images/kitchens/commercial-kitchen-1.jpg',
    },
    {
      id: 2,
      name: 'Advanced Culinary Techniques',
      description: 'Assess your cooking expertise',
      questions: 40,
      passingScore: 75,
      status: 'available',
      image: '/images/kitchens/commercial-kitchen-1.jpg',
    },
    {
      id: 3,
      name: 'Leadership & Management',
      description: 'Kitchen management and staff leadership',
      questions: 45,
      passingScore: 72,
      status: 'coming_soon',
      image: '/images/kitchens/commercial-kitchen-1.jpg',
    },
  ]

  return (
    <div className="space-y-8 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Exams</h1>
        <p className="text-muted-foreground">
          Test your knowledge and earn certifications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <Card key={exam.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={exam.image}
                alt={exam.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{exam.name}</CardTitle>
              <CardDescription>{exam.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions</span>
                  <span className="font-semibold">{exam.questions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Passing Score</span>
                  <span className="font-semibold">{exam.passingScore}%</span>
                </div>
              </div>
              <Button
                className="w-full"
                disabled={exam.status === 'coming_soon'}
              >
                <FileText className="w-4 h-4 mr-2" />
                {exam.status === 'coming_soon' ? 'Coming Soon' : 'Start Exam'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
