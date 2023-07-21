import { NextResponse } from 'next/server'
import { refresh } from '@/helpers/api/service/auth-service'
import { ApiError } from '@/helpers/api/exceptions/api-error'

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *      tags: [authorization]
 *      summary: Refresh token
 *      description: Refresh token
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
    const authorizationHeaders = req.headers.get('authorization')
    if (!authorizationHeaders) {
      throw new ApiError(401, 'Token is required')
    }
    const refreshToken = authorizationHeaders.split(' ')[1]
    if (!refreshToken) {
      throw new ApiError(401, 'Token is required')
    }
    const userData = await refresh(refreshToken)
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
