import { NextRequest, NextResponse } from 'next/server'
import { createComment } from '@/helpers/api/service/comment-service'

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
