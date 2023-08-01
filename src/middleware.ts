import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/helpers/api/isAuthenticated'

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ['/api/users/:path*', '/api/posts/:path*', '/api/comments/:path*'],
}

export async function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  const isAuth = await isAuthenticated(request)
  if (!isAuth) {
    // Respond with JSON indicating an error message
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Authentication failed' }),
      {
        status: 401,
        headers: { 'content-type': 'application/json' },
      } as any
    )
  }
}
