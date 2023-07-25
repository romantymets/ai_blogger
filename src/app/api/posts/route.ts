import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'
import { uploadImageToS3 } from '@/helpers/api/aws'
import { createPost } from '@/helpers/api/service/post-service'

/**
 * @swagger
 * /api/posts:
 *   post:
 *      tags: [posts]
 *      summary: Create new post
 *      description: Create new post.
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *               title: string
 *               content: string
 *               userId: string
 *               image?: file
 *               subtitle?: string
 *              example:
 *               title: test post title
 *               subtitle: some subtitle
 *               content: some article
 *               userId: 123
 *               image?: some image
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *               title: string
 *               content: string
 *               authorId: string
 *               image: string
 *             example:
 *               title: article title
 *               content: user article
 *               image: some image
 *               authorId: ssdd89
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as Blob | null
    const title = formData.get('title') as string | ''
    const subtitle = formData.get('subtitle') as string | ''
    const userId = formData.get('userId') as string | ''
    const content = formData.get('content') as string | ''
    let fileName
    if (image) {
      const mimeType = image.type
      const fileExtension = mimeType.split('/')[1]

      const buffer = Buffer.from(await image.arrayBuffer())
      fileName = await uploadImageToS3(buffer, uuid(), fileExtension, {
        width: 1440,
        height: 800,
      })
    }

    const postData = await createPost({
      id: userId,
      title,
      content,
      subtitle,
      ...(fileName && { image: fileName }),
    })
    return new NextResponse(JSON.stringify(postData))
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
