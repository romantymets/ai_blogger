import { NextResponse } from 'next/server'
import { login } from '@/helpers/api/service/auth-service'

export async function POST(req: Request) {
  try {
    const result = await req.json()
    const { email, password } = result
    const userData = await login(email, password)
    const response = new NextResponse(JSON.stringify(userData))
    response.cookies.set({
      name: 'refreshToken',
      value: userData.refreshToken,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    } as any)
    return response
  } catch (error: any) {
    console.error('error ==>', error)
    return new NextResponse(
      JSON.stringify({
        message: error.message,
        name: error.name,
        errors: error.errors,
      }),
      {
        status: error.status || 500,
        headers: { 'content-type': 'application/json' },
      } as any
    )
  }
}
