import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: object) {
          request.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: object) {
          request.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  // and Server Actions
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .svg (svg files)
     * - .png (png files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png$).*)',
  ],
}
