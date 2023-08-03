import { NextRequest } from 'next/server'

import { saveS3Image } from '@/helpers/api/aws'
import { createPost } from '@/helpers/api/service/post-service'
import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { generateResponse } from '@/utils/generateResponse'

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
 *               author: object
 *             example:
 *               title: article title
 *               content: user article
 *               image: some image
 *               authorId: ssdd89
 *               author: {id: 122, userName: ro, image: image || null}
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as Blob | null
    const title = formData.get('title') as string | ''
    const subtitle = formData.get('subtitle') as string | ''
    const userId = formData.get('userId') as string | ''
    const content = formData.get('content') as string | ''

    const fileName = await saveS3Image(image, {
      width: 1440,
      height: 800,
    })

    const postData = await createPost({
      id: userId,
      title,
      content,
      subtitle,
      ...(fileName && { image: fileName }),
    })
    return generateResponse(postData)
  } catch (error) {
    return generateErrorResponse(error)
  }
}
