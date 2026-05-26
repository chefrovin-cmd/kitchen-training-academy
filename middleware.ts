import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow public routes
  if (pathname.startsWith('/(auth)') || pathname === '/' || pathname === '/login' || pathname === '/signup') {
    return NextResponse.next()
  }

  // Check for auth token in cookies
  const authToken = request.cookies.get('__session')?.value

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    if (!authToken) {
      // Redirect to login
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
