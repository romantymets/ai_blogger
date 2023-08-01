import prisma from '@/libs/prisma'
import bcrypt from 'bcrypt'

import {
  CreateUserCredential,
  UpdateUserCredential,
} from '@/models/userServiceModel'
import { findUserFromDbByEmail } from '@/helpers/api/service/auth-service'
import { ApiError } from '@/helpers/api/exceptions/api-error'
import { deleteS3image } from '@/helpers/api/aws'
import { generateUserDto } from '@/helpers/api/dtos/userDto'
import { generateTokens, saveToken } from '@/helpers/api/service/token-service'
import { generateTokensDto } from '@/helpers/api/dtos/tokensDto'

export const findUserById = async (id: string) => {
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
  return user
}

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
  const user = await findUserById(id)

  const posts = await prisma.posts.findMany({
    where: {
      authorId: id,
    },
  })

  if (posts) {
    for (const post of posts) {
      if (post?.image) {
        post.image = await deleteS3image(post.image)
      }
    }
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

export const getUserById = async (id: string) => {
  const user = await findUserById(id)
  const userDto = await generateUserDto(user)
  return {
    aboutUser: user.aboutUser,
    ...userDto,
  }
}

export const updateUser = async (
  id: string,
  userData: UpdateUserCredential
) => {
  const user = await findUserById(id)

  if (userData?.image) {
    if (user?.image !== userData?.image) {
      if (user?.image) {
        await deleteS3image(user.image)
      }
    }
  }

  const tokensDto = await generateTokensDto({
    ...user,
    userName: userData.userName,
  })

  const tokens = await generateTokens(tokensDto)

  const updatedUser = await prisma.users.update({
    where: {
      id,
    },
    data: {
      userName: userData.userName,
      aboutUser: userData.aboutUser,
      ...(userData?.image && { image: userData.image }),
    },
  })

  await saveToken(updatedUser.id, tokens.refreshToken)

  const userDto = await generateUserDto(updatedUser)
  return {
    ...tokens,
    ...userDto,
  }
}
