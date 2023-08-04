import { NextRequest, NextResponse } from 'next/server'
import { deletePost, updatePost } from '@/helpers/api/service/post-service'
import { saveS3Image } from '@/helpers/api/aws'
import { generateErrorResponse } from '@/utils/generateErrorResponse'
import { generateResponse } from '@/utils/generateResponse'
import { ParamsId } from '@/models/params'
import { postValidationSchema } from '@/helpers/validationSchema/postValidationSchema'
import { parseBody } from '@/helpers/api/middleware/parseBody'

/**
 * @swagger
 * /api/posts/id:
 *   delete:
 *      tags: [posts]
 *      summary: Delete single post
 *      description: return deleted post
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
    const post = await deletePost(params.id)
    return generateResponse(post)
  } catch (error) {
    return generateErrorResponse(error)
  }
}

/**
 * @swagger
 * /api/post/id:
 *   put:
 *      tags: [posts]
 *      summary: Update post
 *      description: Update post.
 *      requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *               title: string
 *               content: string
 *               id: string
 *               image?: file
 *               subtitle?: string
 *              example:
 *               title: test post title
 *               subtitle: some subtitle
 *               content: some article
 *               id: 123
 *               image?: some image
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *               title: string
 *               content: string
 *               subtitle?: string
 *               authorId: string
 *               image: string
 *               author: object
 *             example:
 *               title: article title
 *               content: user article
 *               subtitle?: some subtitle
 *               image: some image
 *               authorId: ssdd89
 *               author: {id: 122, userName: ro, image: image || null}
 */
export async function PUT(request: NextRequest, { params }: ParamsId) {
  try {
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

    const postData = await updatePost({
      id: params.id,
      title,
      content,
      subtitle,
      ...(fileName && { image: fileName }),
    })
    return new NextResponse(JSON.stringify(postData))
  } catch (error) {
    return generateErrorResponse(error)
  }
}
