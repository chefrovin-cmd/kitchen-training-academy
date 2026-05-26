'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UtensilsCrossed } from 'lucide-react'

export default function RecipesPage() {
  const recipes = [
    {
      id: 1,
      name: 'Pan Seared Salmon',
      cuisine: 'Continental',
      difficulty: 'Intermediate',
      image: '/images/recipes/plating-example.jpg',
      chef: 'Chef Rovin Dhar',
    },
    {
      id: 2,
      name: 'Butter Chicken',
      cuisine: 'Indian',
      difficulty: 'Intermediate',
      image: '/images/recipes/plating-example.jpg',
      chef: 'Chef Rovin Dhar',
    },
    {
      id: 3,
      name: 'Chocolate Lava Cake',
      cuisine: 'Desserts',
      difficulty: 'Advanced',
      image: '/images/recipes/plating-example.jpg',
      chef: 'Chef Rovin Dhar',
    },
  ]

  return (
    <div className="space-y-8 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Recipes</h1>
        <p className="text-muted-foreground">
          Explore professional recipes curated by Chef Rovin Dhar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{recipe.name}</CardTitle>
              <CardDescription>{recipe.cuisine}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Difficulty: {recipe.difficulty}</span>
                <span className="text-primary">By {recipe.chef}</span>
              </div>
              <Button className="w-full" variant="outline">
                <UtensilsCrossed className="w-4 h-4 mr-2" />
                View Recipe
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
