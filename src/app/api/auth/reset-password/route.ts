import { NextRequest } from 'next/server'
import { resetPassword } from '@/helpers/api/service/auth-service'
import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { generateResponse } from '@/utils/generateResponse'
import { parseBody } from '@/helpers/api/middleware/parseBody'
import { loginValidationSchema } from '@/helpers/validationSchema/loginValidationSchema'

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
 *               password: string
 *               confirmPassword: string
 *            example:
 *              email: test@test.com
 *              password: password123
 *              confirmPassword: password123
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

    const userData = await resetPassword(email, password)

    return generateResponse(userData)
  } catch (error) {
    return generateErrorResponse(error)
  }
}
