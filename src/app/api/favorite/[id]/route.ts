import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { ParamsId } from '@/models/params'
import { generateResponse } from '@/utils/generateResponse'
import { deleteFavorite } from '@/helpers/api/service/favorite-service'

/**
 * @swagger
 * /api/favorite/id:
 *   delete:
 *      tags: [favorite]
 *      summary: Delete single favorite
 *      description: return deleted favorite
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *                 id: string
 *                 userId: string
 *                 postId: string
 *             example:
 *                 userId: 1
 *                 postId: 2
 *                 id: 3
 */
export async function DELETE(request: Request, { params }: ParamsId) {
  try {
    const favorite = await deleteFavorite(params.id)
    return generateResponse(favorite)
  } catch (error) {
    return generateErrorResponse(error)
  }
}
