import { NextResponse } from 'next/server'
import { login } from '@/helpers/api/service/auth-service'

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *      tags: [authorization]
 *      summary: Login
 *      description: login user.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               email: string
 *               password: string
 *            example:
 *              email: test@test.com
 *              password: password123
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *               email: string
 *               password: string
 *               userId: string
 *               image: string
 *               accessToken: string
 *               refreshToken: string
 *             example:
 *               email: test@test.com
 *               userId: 123h
 *               userName: user
 *               image: some image
 *               accessToken: token
 *               refreshToken: token
 */
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
  } catch (error) {
    console.error('error ==>', error)
    return new NextResponse(
      JSON.stringify({
        message: error.message || error.name,
        name: error.name,
        errors: error.errors,
      }),
      {
        status: error.status || 500,
        message: error.message || error.name,
        headers: { 'content-type': 'application/json' },
      } as any
    )
  }
}
