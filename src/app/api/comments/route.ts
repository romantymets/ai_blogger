import { NextRequest, NextResponse } from 'next/server'
import { createComment } from '@/helpers/api/service/comment-service'
import { generateErrorResponse } from '@/utils/generateErrorResponse'

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
 *               authorId: string
 *               postId: string
 *              example:
 *               comment: test post title
 *               postId: some article
 *               authorId: 123
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
    const { comment, authorId, postId } = await request.json()

    const commentData = await createComment({
      comment,
      authorId,
      postId,
    })
    return new NextResponse(JSON.stringify(commentData))
  } catch (error) {
    return generateErrorResponse(error)
  }
}
