import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export interface CookiesCredential {
  refreshToken: string
  accessToken: string
  userId: string
}

export const setCookies = (cookiesCredential: CookiesCredential) => {
  const cookieStore = cookies()

  cookieStore.set({
    name: 'accessToken',
    value: cookiesCredential.accessToken,
    maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE),
    httpOnly: true,
  } as any)
  cookieStore.set({
    name: 'userId',
    value: cookiesCredential.userId,
    httpOnly: true,
  } as any)
  cookieStore.set({
    name: 'refreshToken',
    value: cookiesCredential.refreshToken,
    maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE),
    httpOnly: true,
  } as any)
}

export const setCookiesByRes = (
  response: NextResponse,
  cookiesCredential: CookiesCredential
): NextResponse => {
  setCookies(cookiesCredential)
  return response
}

export const generateResponse = (
  data: any,
  cookies?: CookiesCredential
): NextResponse => {
  const response = new NextResponse(JSON.stringify(data))
  if (cookies) {
    setCookiesByRes(response, cookies)
  }
  return response
}

export const removeCookies = (response: NextResponse): NextResponse => {
  response.cookies.delete('accessToken' as any)
  response.cookies.delete('userId' as any)
  response.cookies.delete('refreshToken' as any)
  return response
}
