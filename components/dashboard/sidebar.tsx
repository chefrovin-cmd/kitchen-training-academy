'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChefHat, BookOpen, UtensilsCrossed, FileText, Brain, BarChart3, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: ChefHat },
  { label: 'Courses', href: '/dashboard/courses', icon: BookOpen },
  { label: 'Recipes', href: '/dashboard/recipes', icon: UtensilsCrossed },
  { label: 'Exams', href: '/dashboard/exams', icon: FileText },
  { label: 'Psychometric', href: '/dashboard/psychometric', icon: Brain },
  { label: 'Leaderboard', href: '/dashboard/leaderboard', icon: BarChart3 },
]

const adminNavItems = [
  { label: 'Admin Dashboard', href: '/admin/dashboard', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg hover:opacity-80">
          <ChefHat className="w-6 h-6 text-primary" />
          <span>KitchenPro</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className="w-full justify-start"
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            </Link>
          )
        })}

        {user?.role === 'admin' && (
          <>
            <div className="px-2 py-4 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground px-2">ADMIN</p>
            </div>
            {adminNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </>
        )}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <div className="px-2 py-2 text-sm">
          <p className="font-medium">{user?.displayName || 'User'}</p>
          <p className="text-xs text-muted-foreground">{user?.role || 'staff'}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
