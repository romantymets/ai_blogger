import { NextRequest } from 'next/server'
import {
  deleteUser,
  getUserById,
  updateUser,
} from '@/helpers/api/service/user-service'
import { saveS3Image } from '@/helpers/api/aws'
import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { parseBody } from '@/helpers/api/middleware/parseBody'
import { updateUserValidationSchema } from '@/helpers/validationSchema/updateUserValidationSchema'
import { generateResponse, removeCookies } from '@/utils/generateResponse'

/**
 * @swagger
 * /api/users/id:
 *   get:
 *      tags: [users]
 *      summary: Get single user
 *      description: return user
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *                 userId: string
 *                 email: string
 *                 userName: string
 *                 image: string | null
 *                 aboutUser: string | null
 *             example:
 *                 userId: 1f
 *                 email: amail@amail.com
 *                 userName: test
 *                 image: http//image
 *                 aboutUser: about user

 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userData = await getUserById(params.id)
    return generateResponse({ data: userData })
  } catch (error) {
    return generateErrorResponse(error)
  }
}

/**
 * @swagger
 * /api/users/id:
 *   put:
 *      tags: [users]
 *      summary: Update single user
 *      description: return updated user
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *               userName: string
 *               aboutUser?: string
 *               image?: file
 *            example:
 *              userName: user
 *              aboutUser?: my name is user
 *              image?: some image
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *                 email: string
 *                 userName: string
 *                 aboutUser: string
 *                 image: string
 *             example:
 *                 email: test@test.com
 *                 userName: user
 *                 aboutUser: my name is user
 *                 image: some image
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {
      isValid,
      errors,
      data = {},
    } = await parseBody(request, updateUserValidationSchema)

    if (!isValid && errors) {
      return generateErrorResponse({
        name: errors[0],
        status: 422,
        message: errors[0],
        errors,
      })
    }

    const { aboutUser, userName, image = null } = data

    const fileName = await saveS3Image(image)

    const { user, tokens } = await updateUser(params.id, {
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

/**
 * @swagger
 * /api/users/id:
 *   delete:
 *      tags: [users]
 *      summary: Delete single user
 *      description: return deleted user
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *                 email: string
 *                 userName: string
 *                 aboutUser: string
 *                 image: string
 *             example:
 *                 email: test@test.com
 *                 userName: user
 *                 aboutUser: my name is user
 *                 image: some image
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userData = await deleteUser(params.id)
    const response = generateResponse(userData)
    removeCookies(response)
    return response
  } catch (error) {
    return generateErrorResponse(error)
  }
}
