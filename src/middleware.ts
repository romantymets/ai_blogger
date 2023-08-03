import { NextRequest, NextResponse } from 'next/server'
import { validateAccessToken } from '@/helpers/api/service/token-service'

import { CookiesCredential, setCookies } from '@/utils/generateResponse'

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ['/api/users/:path*', '/api/posts/:path*', '/api/comments/:path*'],
}

const generateNewTokens = async (cookie: CookiesCredential) => {
  return await fetch(`${process.env.CANONICAL_URL}/api/auth/refresh`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({
      refreshToken: cookie.refreshToken,
      userId: cookie.userId,
    }),
  })
}

const getNewTokensData = async (cookie: CookiesCredential) => {
  try {
    const result = await generateNewTokens(cookie)
    return result.json()
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  const accessToken = request.cookies.get('accessToken' as any)
  const refreshToken = request.cookies.get('refreshToken' as any)
  const userId = request.cookies.get('userId' as any)

  const isAssesTokenValid = await validateAccessToken(
    accessToken?.value as string
  )
  if (!isAssesTokenValid) {
    const refreshData = await getNewTokensData({
      refreshToken: refreshToken.value,
      accessToken: accessToken.value,
      userId: userId.value,
    })
    if (!refreshData) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'authentication failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } } as any
      )
    } else {
      const response = NextResponse.next()
      setCookies(response, {
        accessToken: refreshData.accessToken,
        refreshToken: refreshData.refreshToken,
        userId: refreshData.userId,
      })
      return response
    }
  }
}
