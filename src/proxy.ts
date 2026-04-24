import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const PROTECTED = ['/dashboard', '/teachers', '/schools']
// Routes that authenticated users should not see
const AUTH_ONLY = ['/login']

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll().map(c => ({ name: c.name, value: c.value })),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refresh session — required for Server Components to receive updated tokens
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Unauthenticated user hitting a protected route -> send to login
  if (!user && PROTECTED.some(p => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Authenticated user hitting login -> send to dashboard
  if (user && AUTH_ONLY.some(p => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
