import prisma from '@/libs/prisma'
import bcrypt from 'bcrypt'

import {
  CreateUserCredential,
  UpdateUserCredential,
} from '@/models/userServiceModel'
import {
  findUserFromDbByEmail,
  generateUserData,
} from '@/helpers/api/service/auth-service'
import { ApiError } from '@/helpers/api/exceptions/api-error'
import { deleteS3image } from '@/helpers/api/aws'
import { generateUserDto } from '@/helpers/api/dtos/userDto'

export const findUserById = async (id: string) => {
  if (!id) {
    throw new ApiError(500, 'Bad credential')
  }
  const user = await prisma.user.findUnique({
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
  const candidate = await findUserFromDbByEmail(payload.email)
  if (candidate) {
    throw ApiError.BadRequest(`user with ${payload.email} already exist`)
  }
  const hashedPassword = await bcrypt.hash(payload.password, 3)
  return await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
      userName: payload.userName,
      aboutUser: payload.aboutUser,
      image: payload.image,
    },
  })
}

export const deleteUser = async (id: string) => {
  const user = await findUserById(id)

  const posts = await prisma.post.findMany({
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

  return await prisma.user.delete({
    where: {
      id,
    },
  })
}

export const getAllUsers = async () =>
  await prisma.user.findMany({
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

  if (!user) {
    throw new ApiError(500, 'User not found')
  }

  if (userData?.image) {
    if (user?.image !== userData?.image) {
      if (user?.image) {
        await deleteS3image(user.image)
      }
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      userName: userData.userName,
      aboutUser: userData.aboutUser,
      ...(userData?.image && { image: userData.image }),
    },
  })

  const { userDto, tokens } = await generateUserData(updatedUser)

  return {
    tokens,
    user: userDto,
  }
}
