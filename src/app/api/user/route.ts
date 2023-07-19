import { NextResponse } from 'next/server'
import { getAllUsers } from '@/helpers/api/service/user-service'
import { generateImageUrl } from '@/helpers/api/aws'

/**
 * @swagger
 * /api/user:
 *   get:
 *      tags: [user]
 *      summary: User list
 *      description: return users array
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *                 id: string
 *                 email: string
 *                 userName: string
 *                 image: string
 *                 aboutUser: string
 *                 hashedPassword: string
 *                 createdAt: string
 *                 updatedAt: string
 *                 favoriteIds: array
 *                 posts: array
 *                 account: array
 *                 comments: array
 *             example:
 *                 id: 1f
 *                 email: amail@amail.com
 *                 userName: test
 *                 image: http//image
 *                 aboutUser: about user
 *                 hashedPassword: 123d
 *                 createdAt: registration date
 *                 updatedAt: edit user date
 *                 favoriteIds: []
 *                 posts: []
 *                 account: []
 *                 comments: []
 */
export async function GET() {
  const users = await getAllUsers()
  for (const user of users) {
    if (user?.image) {
      user.image = await generateImageUrl(user.image)
    }
  }

  return NextResponse.json({ data: users })
}
