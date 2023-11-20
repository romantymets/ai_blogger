import { NextRequest } from 'next/server'

import { saveS3Image } from '@/helpers/api/aws'
import { createPost } from '@/helpers/api/service/post-service'
import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { generateResponse } from '@/utils/generateResponse'
import { parseBody } from '@/helpers/api/middleware/parseBody'
import { postValidationSchema } from '@/helpers/validationSchema/postValidationSchema'

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
 *               image?: file
 *               subtitle?: string
 *              example:
 *               title: test post title
 *               subtitle: some subtitle
 *               content: some article
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
    const userId = request.cookies.get('userId' as any)

    const {
      isValid,
      errors,
      data = {},
    } = await parseBody(request, postValidationSchema)

    if (!isValid && errors) {
      return generateErrorResponse({
        name: errors[0],
        status: 422,
        message: errors[0],
        errors,
      })
    }

    const { title, content, subtitle, image = null } = data

    const fileName = await saveS3Image(image, {
      width: 1440,
      height: 800,
    })

    const postData = await createPost({
      id: userId.value,
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
