import prisma from '@/libs/prisma'

import { ApiError } from '@/helpers/api/exceptions/api-error'
import { deleteS3image } from '@/helpers/api/aws'
import { CreatePostCredential } from '@/models/postsServiceModel'
import { findUserById } from '@/helpers/api/service/user-service'

export const findPostById = async (id: string) => {
  if (!id) {
    throw new ApiError(500, 'Bad credential')
  }
  const post = await prisma.posts.findUnique({
    where: {
      id,
    },
  })

  if (!post) {
    throw new ApiError(500, 'Post not found')
  }
  return post
}

export const createPost = async ({
  id,
  title,
  image,
  content,
  subtitle,
}: CreatePostCredential) => {
  if (!id) {
    throw ApiError.BadRequest('Bad credential')
  }
  const user = await findUserById(id)

  if (!user) {
    throw ApiError.BadRequest(`user with ${id} not exist`)
  }

  return await prisma.posts.create({
    data: {
      title,
      content,
      image,
      authorId: user.id,
      subtitle,
    },
  })
}

export const deletePost = async (id: string) => {
  const post = await findPostById(id)

  if (post?.image) {
    await deleteS3image(post.image)
  }

  return await prisma.posts.delete({
    where: {
      id,
    },
  })
}

export const getAllPosts = async () =>
  await prisma.posts.findMany({
    include: {
      author: true,
      comments: true,
    },
    orderBy: [{ createdAt: 'desc' }],
  })
