import { NextResponse } from 'next/server'
import { resetPassword } from '@/helpers/api/service/auth-service'

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *      tags: [authorization]
 *      summary: Reset password
 *      description: Reset password.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               email: string
 *               newPassword: string
 *            example:
 *              email: test@test.com
 *              newPassword: password123
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *               email: string
 *               userId: string
 *               userName: string
 *             example:
 *               email: test@test.com
 *               userId: 123h
 *               userName: user
 */
export async function POST(req: Request) {
  try {
    const result = await req.json()
    const { email, newPassword } = result
    const userData = await resetPassword(email, newPassword)
    return new NextResponse(JSON.stringify(userData))
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
