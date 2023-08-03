import { NextResponse } from 'next/server'

export interface CookiesCredential {
  refreshToken: string
  accessToken: string
  userId: string
}

export const setCookies = (
  response: NextResponse,
  cookies: CookiesCredential
) => {
  response.cookies.set({
    name: 'accessToken',
    value: cookies.accessToken,
    maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE),
    httpOnly: true,
  } as any)
  response.cookies.set({
    name: 'userId',
    value: cookies.userId,
    httpOnly: true,
  } as any)
  response.cookies.set({
    name: 'refreshToken',
    value: cookies.refreshToken,
    maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE),
    httpOnly: true,
  } as any)
  return response
}

export const generateResponse = (data: any, cookies?: CookiesCredential) => {
  const response = new NextResponse(JSON.stringify(data))
  if (cookies) {
    setCookies(response, cookies)
  }
  return response
}
