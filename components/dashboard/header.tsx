'use client'

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Menu, LogOut } from 'lucide-react'

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-semibold text-foreground">KitchenPro Academy</h1>
          <p className="text-xs text-muted-foreground">Chef Rovin Dhar&apos;s Culinary Training Platform</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium">{user?.displayName || 'User'}</p>
          <p className="text-xs text-muted-foreground capitalize">{user?.role || 'staff'}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
          onClick={logout}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
