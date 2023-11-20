import { NextRequest } from 'next/server'
import { login } from '@/helpers/api/service/auth-service'
import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { generateResponse } from '@/utils/generateResponse'
import { parseBody } from '@/helpers/api/middleware/parseBody'
import { loginValidationSchema } from '@/helpers/validationSchema/loginValidationSchema'

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
 *               userId: string
 *               image: string
 *             example:
 *               email: test@test.com
 *               userId: 123h
 *               userName: user
 *               image: some image
 */
export async function POST(request: NextRequest) {
  try {
    const {
      isValid,
      errors,
      data = {},
    } = await parseBody(request, loginValidationSchema)

    if (!isValid && errors) {
      return generateErrorResponse({
        name: errors[0],
        status: 422,
        message: errors[0],
        errors,
      })
    }

    const { email, password } = data

    const { tokens, user } = await login(email, password)

    return generateResponse(user, {
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
      userId: user.userId,
    })
  } catch (error) {
    return generateErrorResponse(error)
  }
}
