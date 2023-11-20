import { NextRequest } from 'next/server'
import { createComment } from '@/helpers/api/service/comment-service'
import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { parseBody } from '@/helpers/api/middleware/parseBody'
import { commentValidationSchema } from '@/helpers/validationSchema/commentValidationSchema'
import { generateResponse } from '@/utils/generateResponse'

/**
 * @swagger
 * /api/comments:
 *   post:
 *      tags: [comments]
 *      summary: Create new comment
 *      description: Create new comment.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *               comment: string
 *               postId: string
 *              example:
 *               comment: test post title
 *               postId: some article
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *               comment: string
 *               authorId: string
 *               postId: string
 *               author: object
 *               post: object
 *             example:
 *               comment: article title
 *               userId: 123
 *               authorId: ssdd89
 *               author: {}
 *               post: {}
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.cookies.get('userId' as any)

    const {
      isValid,
      errors,
      data = {},
    } = await parseBody(request, commentValidationSchema)

    if (!isValid && errors) {
      return generateErrorResponse({
        name: errors[0],
        status: 422,
        message: errors[0],
        errors,
      })
    }

    const { comment, postId } = data

    const commentData = await createComment({
      comment,
      authorId: userId.value,
      postId,
    })

    return generateResponse(commentData)
  } catch (error) {
    return generateErrorResponse(error)
  }
}
