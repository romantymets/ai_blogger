import prisma from '@/libs/prisma'
import { ApiError } from '@/helpers/api/exceptions/api-error'
import { deleteS3image, generateImageUrl } from '@/helpers/api/aws'
import { CreatePostCredential } from '@/models/postsServiceModel'
import { findUserById } from '@/helpers/api/service/user-service'
import { Post } from '@/models/postsModel'

export const getMaxPopularity = async (): Promise<number> => {
  const commentsAndLikesCount = await prisma.post.findMany({
    select: {
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  })

  return Math.max(
    ...commentsAndLikesCount.map(
      ({ _count }) => _count?.likes + _count?.comments * 2 || 0
    )
  )
}

const calculatePostPopularity = async (post: Post): Promise<number> => {
  const maxPopularity = await getMaxPopularity()

  const doubleCommentAndLike = post.likes.length + post.comments.length * 2 || 0

  const popularity = (doubleCommentAndLike / maxPopularity) * 5

  return Number(popularity.toFixed(2))
}

const generatePostsResponse = async (posts: Post[]) => {
  const newPosts: Post[] = []

  for (const post of posts) {
    const popularity = await calculatePostPopularity(post)
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
    newPosts.push({ ...post, popularity })
  }

  return newPosts
}

export const findPostById = async (id: string) => {
  if (!id) {
    throw new ApiError(500, 'Bad credential')
  }
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  })

  if (!post) {
    throw new ApiError(500, 'Post not found')
  }

  return {
    ...post,
    image: post?.image ? await generateImageUrl(post.image) : null,
    author: {
      userName: post.author.userName,
      id: post.author.id,
      image: post?.author?.image
        ? await generateImageUrl(post.author.image)
        : null,
    },
    popularity: await calculatePostPopularity(post),
  }
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

  return await prisma.post.create({
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

  return await prisma.post.delete({
    where: {
      id,
    },
  })
}

export const getAllPosts = async (query: any, countQuery = {}) => {
  try {
    const total = await prisma.post.count(countQuery)

    const posts = await prisma.post.findMany(query)

    const newPosts = await generatePostsResponse(posts)

    return { total, posts: newPosts }
  } catch (error) {
    throw new ApiError(error.status || 500, error.message)
  }
}

export const getResentPosts = async (id: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        NOT: {
          id,
        },
      },
      take: 4,
      orderBy: [{ createdAt: 'desc' }],
    })

    for (const post of posts) {
      if (post?.image) {
        post.image = await generateImageUrl(post.image)
      }
    }

    return posts
  } catch (error) {
    throw new ApiError(error.status || 500, error.message)
  }
}

export const updatePost = async (postData: CreatePostCredential) => {
  const post = await findPostById(postData.id)

  if (postData?.image) {
    if (post?.image !== postData?.image) {
      if (post?.image) {
        await deleteS3image(post.image)
      }
    }
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postData.id,
    },
    include: {
      author: true,
    },
    data: {
      title: postData.title,
      subtitle: postData.subtitle,
      content: postData.content,
      ...(postData?.image && { image: postData.image }),
    },
  })

  if (!updatedPost) {
    throw new ApiError(500, 'Post not found')
  }

  return {
    ...updatedPost,
    image: updatedPost?.image
      ? await generateImageUrl(updatedPost.image)
      : null,
    author: {
      userName: updatedPost?.author?.userName,
      id: updatedPost?.author?.id,
      image: updatedPost?.author?.image
        ? await generateImageUrl(updatedPost.author.image)
        : null,
    },
  }
}
