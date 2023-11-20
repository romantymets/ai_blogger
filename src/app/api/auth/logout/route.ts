import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { generateResponse, removeCookies } from '@/utils/generateResponse'

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *      tags: [authorization]
 *      summary: Logout
 *      description: Logout
 */
export async function POST() {
  try {
    const response = generateResponse(null)
    removeCookies(response)
    return response
  } catch (error) {
    return generateErrorResponse(error)
  }
}
