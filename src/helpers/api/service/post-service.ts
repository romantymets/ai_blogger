import prisma from '@/libs/prisma'
import { ApiError } from '@/helpers/api/exceptions/api-error'
import { deleteS3image, generateImageUrl } from '@/helpers/api/aws'
import { CreatePostCredential } from '@/models/postsServiceModel'
import { findUserById } from '@/helpers/api/service/user-service'
import { Post } from '@/models/postsModel'

const generatePostsResponse = async (posts: Post[]) => {
  for (const post of posts) {
    if (post?.image) {
      post.image = await generateImageUrl(post.image)
    }
    post.author = {
      userName: post.author.userName,
      id: post.author.id,
      image: post.author?.image
        ? await generateImageUrl(post.author.image)
        : null,
    }
  }
  return posts
}

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

export const getAllPosts = async (query: any, countQuery = {}) => {
  try {
    const total = await prisma.posts.count(countQuery)
    const posts = await prisma.posts.findMany(query)

    const newPosts = await generatePostsResponse(posts)

    return { total, posts: newPosts }
  } catch (error) {
    throw new ApiError(error.status || 500, error.message)
  }
}
