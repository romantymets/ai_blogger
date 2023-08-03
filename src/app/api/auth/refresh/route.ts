import { NextRequest } from 'next/server'
import { refresh } from '@/helpers/api/service/auth-service'
import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { generateResponse } from '@/utils/generateResponse'
import { parseBody } from '@/helpers/api/middleware/parseBody'
import { refreshValidationSchema } from '@/helpers/validationSchema/refreshValidationSchema'

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
export async function POST(request: NextRequest) {
  try {
    const {
      isValid,
      errors,
      data = {},
    } = await parseBody(request, refreshValidationSchema)

    if (!isValid && errors) {
      return generateErrorResponse({
        name: errors[0],
        status: 401,
        message: errors[0],
        errors,
      })
    }
    const { userId, refreshToken } = data

    const userData = await refresh(refreshToken, userId)
    return generateResponse(userData, {
      refreshToken: userData.refreshToken,
      accessToken: userData.accessToken,
      userId: userData.userId,
    })
  } catch (error) {
    return generateErrorResponse(error)
  }
}
