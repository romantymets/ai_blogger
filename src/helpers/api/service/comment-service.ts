import prisma from '@/libs/prisma'
import { ApiError } from '@/helpers/api/exceptions/api-error'
import { generateImageUrl } from '@/helpers/api/aws'
import { findUserById } from '@/helpers/api/service/user-service'
import { findPostById } from '@/helpers/api/service/post-service'
import { CreateCommentCredential } from '@/models/commentsModel'

export const findCommentsById = async (id: string) => {
  if (!id) {
    throw new ApiError(500, 'Bad credential')
  }
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      post: true,
    },
  })

  if (!comment) {
    throw new ApiError(500, 'Comment not found')
  }

  return {
    ...comment,
    author: {
      userName: comment.author.userName,
      id: comment.author.id,
      image: comment?.author?.image
        ? await generateImageUrl(comment.author.image)
        : null,
    },
    post: {
      id: comment.post.id,
    },
  }
}

export const createComment = async ({
  authorId,
  postId,
  comment,
}: CreateCommentCredential) => {
  if (!authorId || !postId) {
    throw ApiError.BadRequest('Bad credential')
  }
  const user = await findUserById(authorId)
  const post = await findPostById(postId)

  if (!user) {
    throw ApiError.BadRequest(`user with ${authorId} not exist`)
  }

  if (!post) {
    throw ApiError.BadRequest(`post with ${postId} not exist`)
  }

  return await prisma.comment.create({
    data: {
      content: comment,
      authorId: user.id,
      postId: post.id,
    },
  })
}

export const deleteComment = async (id: string) => {
  const comment = await findCommentsById(id)

  if (!comment) {
    throw ApiError.BadRequest(`comment with ${id} not exist`)
  }

  return await prisma.comment.delete({
    where: {
      id: comment.id,
    },
  })
}

export const getCommentsByPost = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        post: {
          id: postId,
        },
      },
      include: {
        author: true,
      },
      orderBy: [{ createdAt: 'asc' }],
    })

    for (const comment of comments) {
      comment.author = {
        userName: comment.author.userName,
        id: comment.author.id,
        image: comment.author?.image
          ? await generateImageUrl(comment.author.image)
          : null,
      }
    }

    return comments
  } catch (error) {
    throw new ApiError(error.status || 500, error.message)
  }
}
