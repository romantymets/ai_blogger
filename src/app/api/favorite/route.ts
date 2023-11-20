import { NextRequest } from 'next/server'

import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { generateResponse } from '@/utils/generateResponse'
import { parseBody } from '@/helpers/api/middleware/parseBody'
import { favoriteValidationSchema } from '@/helpers/validationSchema/favoriteValidationSchema'
import { createFavorite } from '@/helpers/api/service/favorite-service'

/**
 * @swagger
 * /api/favorite:
 *   post:
 *      tags: [favorite]
 *      summary: add post to favorite
 *      description: add post to favorite.
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *               userId: string
 *               postId: string
 *              example:
 *               userId: 1
 *               postId: 2
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *               id: string
 *               userId: string
 *               postId: string
 *             example:
 *               userId: 1
 *               postId: 2
 *               id: 3
 */
export async function POST(request: NextRequest) {
  try {
    const {
      isValid,
      errors,
      data = {},
    } = await parseBody(request, favoriteValidationSchema)

    if (!isValid && errors) {
      return generateErrorResponse({
        name: errors[0],
        status: 422,
        message: errors[0],
        errors,
      })
    }

    const { userId, postId } = data

    const favorite = await createFavorite({
      userId,
      postId,
    })
    return generateResponse(favorite)
  } catch (error) {
    return generateErrorResponse(error)
  }
}
