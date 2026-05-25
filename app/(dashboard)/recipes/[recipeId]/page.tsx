'use client'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Share2, Download, ChefHat } from 'lucide-react'

interface RecipeDetail {
  id: string
  name: string
  description: string
  image: string
  cuisine: string
  difficulty: string
  servings: number
  prepTime: number
  cookTime: number
  chef: string
  chefImage: string
  ingredients: { name: string; amount: string; unit: string }[]
  instructions: { step: number; instruction: string }[]
  tips: string[]
  nutritionPerServing: {
    calories: number
    protein: string
    carbs: string
    fat: string
  }
}

const recipe: RecipeDetail = {
  id: 'pan-seared-salmon',
  name: 'Pan Seared Salmon with Lemon Butter Sauce',
  description:
    'A professional restaurant-quality salmon dish with a delicate lemon butter sauce. Learn the techniques used by Chef Rovin Dhar in high-end culinary establishments.',
  image: '/images/recipes/plating-example.jpg',
  cuisine: 'Continental',
  difficulty: 'Intermediate',
  servings: 2,
  prepTime: 10,
  cookTime: 15,
  chef: 'Chef Rovin Dhar',
  chefImage: '/images/chef/chef-rovin-hero.jpg',
  ingredients: [
    { name: 'Salmon Fillets', amount: '2', unit: 'pieces (150g each)' },
    { name: 'Butter', amount: '50', unit: 'g' },
    { name: 'Fresh Lemon', amount: '1', unit: 'piece' },
    { name: 'Garlic Cloves', amount: '2', unit: 'pieces' },
    { name: 'Fresh Thyme', amount: '2', unit: 'sprigs' },
    { name: 'Sea Salt', amount: '2', unit: 'g' },
    { name: 'Black Pepper', amount: '1', unit: 'g' },
    { name: 'Olive Oil', amount: '15', unit: 'ml' },
  ],
  instructions: [
    {
      step: 1,
      instruction:
        'Pat dry salmon fillets with paper towels. Season generously with sea salt and freshly ground black pepper on both sides.',
    },
    {
      step: 2,
      instruction: 'Heat olive oil in a pan over medium-high heat until shimmering.',
    },
    {
      step: 3,
      instruction:
        'Place salmon skin-side up in the hot pan. Sear for 3-4 minutes until golden brown. Flip carefully.',
    },
    {
      step: 4,
      instruction: 'Cook for another 2-3 minutes until cooked through. Transfer to plate.',
    },
    {
      step: 5,
      instruction: 'In the same pan, melt butter with crushed garlic and thyme sprigs.',
    },
    {
      step: 6,
      instruction: 'Squeeze fresh lemon juice into the butter sauce. Spoon over salmon.',
    },
  ],
  tips: [
    'Use room temperature salmon for even cooking',
    'Donít overcrowd the pan - gives better searing',
    'The butter should foam but not brown',
    'Serve immediately for best results',
    'Pair with roasted vegetables or fresh salad',
  ],
  nutritionPerServing: {
    calories: 380,
    protein: '42g',
    carbs: '2g',
    fat: '22g',
  },
}

export default function RecipeDetailPage({ params }: { params: { recipeId: string } }) {
  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Recipe Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative h-72 w-full rounded-lg overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex gap-2 mb-3">
              <Badge variant="outline">{recipe.cuisine}</Badge>
              <Badge variant="secondary">{recipe.difficulty}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
            <p className="text-lg text-muted-foreground">{recipe.description}</p>
          </div>

          {/* Chef Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={recipe.chefImage}
                    alt={recipe.chef}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-primary" />
                    <p className="font-semibold">{recipe.chef}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Professional Culinary Expert & Course Curator
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recipe Info Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recipe Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Servings</p>
                <p className="text-2xl font-bold">{recipe.servings}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Prep Time</p>
                  <p className="font-semibold">{recipe.prepTime} min</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cook Time</p>
                  <p className="font-semibold">{recipe.cookTime} min</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" size="sm">
                  <Heart className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Per Serving</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Calories</span>
                <span className="font-semibold">{recipe.nutritionPerServing.calories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Protein</span>
                <span className="font-semibold">{recipe.nutritionPerServing.protein}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Carbs</span>
                <span className="font-semibold">{recipe.nutritionPerServing.carbs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fat</span>
                <span className="font-semibold">{recipe.nutritionPerServing.fat}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ingredients & Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ingredients */}
        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded"
                    defaultChecked={false}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{ing.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {ing.amount} {ing.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recipe.instructions.map((inst) => (
                <div key={inst.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                      {inst.step}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed pt-1">{inst.instruction}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chef's Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            Chef&apos;s Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {recipe.tips.map((tip, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
