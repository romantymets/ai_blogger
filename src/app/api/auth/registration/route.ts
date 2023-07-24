import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'
import { registration } from '@/helpers/api/service/auth-service'
import { uploadImageToS3 } from '@/helpers/api/aws'

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
    const formData = await request.formData()
    const image = formData.get('image') as Blob | null
    const email = formData.get('email') as string | ''
    const password = formData.get('password') as string | ''
    const aboutUser = formData.get('aboutUser') as string | ''
    const userName = formData.get('userName') as string | ''
    let fileName
    if (image) {
      const mimeType = image.type
      const fileExtension = mimeType.split('/')[1]

      const buffer = Buffer.from(await image.arrayBuffer())
      fileName = await uploadImageToS3(buffer, uuid(), fileExtension)
    }

    const userData = await registration({
      email,
      password,
      aboutUser,
      userName,
      ...(fileName && { image: fileName }),
    })
    const response = new NextResponse(JSON.stringify(userData))
    response.cookies.set({
      name: 'refreshToken',
      value: userData.refreshToken,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    } as any)
    return response
  } catch (error) {
    console.error(error)
    return new NextResponse(
      JSON.stringify({
        status: error.status,
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
