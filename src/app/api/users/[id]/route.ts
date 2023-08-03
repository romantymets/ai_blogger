import { NextResponse } from 'next/server'
import {
  deleteUser,
  getUserById,
  updateUser,
} from '@/helpers/api/service/user-service'
import { saveS3Image } from '@/helpers/api/aws'
import { generateErrorResponse } from '@/utils/generateErrorResponse'

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
    return NextResponse.json({ data: userData })
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
 *                 accessToken: string
 *                 refreshToken: string
 *             example:
 *                 email: test@test.com
 *                 userName: user
 *                 aboutUser: my name is user
 *                 image: some image
 *                 accessToken: token
 *                 refreshToken: token
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData()

    const aboutUser = formData.get('aboutUser') as string | ''

    const userName = formData.get('userName') as string | ''

    const image = formData.get('image') as Blob | null

    const fileName = await saveS3Image(image)

    const userData = await updateUser(params.id, {
      aboutUser,
      userName,
      ...(fileName && { image: fileName }),
    })
    return new NextResponse(JSON.stringify(userData))
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
 *                 accessToken: string
 *                 refreshToken: string
 *             example:
 *                 email: test@test.com
 *                 userName: user
 *                 aboutUser: my name is user
 *                 image: some image
 *                 accessToken: token
 *                 refreshToken: token
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userData = await deleteUser(params.id)
    return new NextResponse(JSON.stringify(userData))
  } catch (error) {
    return generateErrorResponse(error)
  }
}
