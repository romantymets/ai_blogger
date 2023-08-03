import { NextRequest } from 'next/server'
import { registration } from '@/helpers/api/service/auth-service'
import { saveS3Image } from '@/helpers/api/aws'
import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { generateResponse } from '@/utils/generateResponse'
import { parseBody } from '@/helpers/api/middleware/parseBody'
import { registrationValidationSchema } from '@/helpers/validationSchema/registrationValidationSchema'

/**
 * @swagger
 * /api/auth/registration:
 *   post:
 *      tags: [authorization]
 *      summary: Create new user
 *      description: Create new user.
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *               email: string
 *               password: string
 *               userName: string
 *               aboutUser?: string
 *               image?: file
 *              example:
 *               email: test@test.com
 *               password: password123
 *               userName: user
 *               aboutUser?: my name is user
 *               image?: some image
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *               email: string
 *               userName: string
 *               aboutUser: string
 *               image: string
 *               accessToken: string
 *               refreshToken: string
 *             example:
 *               email: test@test.com
 *               userName: user
 *               aboutUser: my name is user
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
    } = await parseBody(request, registrationValidationSchema)

    if (!isValid && errors) {
      return generateErrorResponse({
        name: errors[0],
        status: 422,
        message: errors[0],
        errors,
      })
    }

    const { email, password, aboutUser, userName, image = null } = data

    const fileName = await saveS3Image(image)

    const { tokens, user } = await registration({
      email,
      password,
      aboutUser,
      userName,
      ...(fileName && { image: fileName }),
    })
    return generateResponse(user, {
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
      userId: user.userId,
    })
  } catch (error) {
    return generateErrorResponse(error)
  }
}
