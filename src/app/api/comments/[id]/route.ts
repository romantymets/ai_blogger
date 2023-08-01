import { NextResponse } from 'next/server'
import { deleteComment } from '@/helpers/api/service/comment-service'

/**
 * @swagger
 * /api/comments/id:
 *   delete:
 *      tags: [comments]
 *      summary: Delete single comment
 *      description: return deleted comment
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *                 content: string
 *                 postId: string
 *                 authorId: string
 *             example:
 *                 content: some comment
 *                 authorId: 23
 *                 postId: 12
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const comment = await deleteComment(params.id)
    return new NextResponse(JSON.stringify(comment))
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
