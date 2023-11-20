import { deleteComment } from '@/helpers/api/service/comment-service'
import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { ParamsId } from '@/models/params'
import { generateResponse } from '@/utils/generateResponse'

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
export async function DELETE(request: Request, { params }: ParamsId) {
  try {
    const comment = await deleteComment(params.id)
    return generateResponse(comment)
  } catch (error) {
    return generateErrorResponse(error)
  }
}
