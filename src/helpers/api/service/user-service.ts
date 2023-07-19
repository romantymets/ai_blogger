import prisma from '@/libs/prisma'
import bcrypt from 'bcrypt'

import { CreateUserCredential } from '@/models/userServiceModel'
import { findUserFromDbByEmail } from '@/helpers/api/service/auth-service'
import { ApiError } from '@/helpers/api/exceptions/api-error'
import { deleteS3image } from '@/helpers/api/aws'

export const createUser = async (payload: CreateUserCredential) => {
  if (!payload?.email) {
    throw ApiError.BadRequest('Bad credential')
  }
  const candidate = await findUserFromDbByEmail(payload.email)
  if (candidate) {
    throw ApiError.BadRequest(`user with ${payload.email} already exist`)
  }
  const hashedPassword = await bcrypt.hash(payload.password, 3)
  return await prisma.users.create({
    data: {
      email: payload.email,
      hashedPassword,
      userName: payload.userName,
      aboutUser: payload.aboutUser,
      image: payload.image,
    },
  })
}

export const deleteUser = async (id: string) => {
  if (!id) {
    throw new ApiError(500, 'Bad credential')
  }
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    throw new ApiError(500, 'User not found')
  }

  if (user?.image) {
    await deleteS3image(user.image)
  }

  const deleteUser = await prisma.users.delete({
    where: {
      id,
    },
  })

  return deleteUser
}

export const getAllUsers = async () =>
  await prisma.users.findMany({
    include: {
      posts: true,
      comments: true,
    },
    orderBy: [{ createdAt: 'desc' }],
  })
