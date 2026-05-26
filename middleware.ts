import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow public routes
  if (pathname === '/' || pathname === '/login' || pathname === '/signup' || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Check for auth token in cookies
  const authToken = request.cookies.get('__session')?.value

  // Protect dashboard and admin routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    if (!authToken) {
      // Redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|images).*)',
  ],
}
