import prisma from '@/libs/prisma'
import { ApiError } from '@/helpers/api/exceptions/api-error'
import { findUserById } from '@/helpers/api/service/user-service'
import { CreateFavoriteCredential } from '@/models/favoriteModel'

export const createFavorite = async ({
  userId,
  postId,
}: CreateFavoriteCredential) => {
  if (!userId || !postId) {
    throw ApiError.BadRequest('Bad credential')
  }
  const user = await findUserById(userId)

  if (!user) {
    throw ApiError.BadRequest(`user with ${userId} not exist`)
  }

  return await prisma.favoritePostByUser.create({
    data: {
      userId,
      postId,
    },
  })
}

export const deleteFavorite = async (id: string) => {
  return await prisma.favoritePostByUser.delete({
    where: {
      id,
    },
  })
}
