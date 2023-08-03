import prisma from '@/libs/prisma'
import { CreateUserCredential } from '@/models/userServiceModel'
import bcrypt from 'bcrypt'
import {
  generateTokens,
  validateRefreshToken,
} from '@/helpers/api/service/token-service'
import { createUser, findUserById } from '@/helpers/api/service/user-service'
import { generateUserDto } from '@/helpers/api/dtos/userDto'
import { ApiError } from '@/helpers/api/exceptions/api-error'
import { generateTokensDto } from '@/helpers/api/dtos/tokensDto'
import { User } from 'prisma/prisma-client'

export const findUserFromDbByEmail = async (email: string) =>
  await prisma.user.findUnique({
    where: {
      email,
    },
  })

export const generateUserData = async (user: User) => {
  const userDto = await generateUserDto(user)
  const tokensDto = await generateTokensDto(user)
  const tokens = await generateTokens(tokensDto)
  return { userDto, tokens }
}

export const registration = async (payload: CreateUserCredential) => {
  const candidate = await createUser(payload)

  const { userDto, tokens } = await generateUserData(candidate)
  return {
    user: userDto,
    tokens,
  }
}

export const login = async (email: string, password: string) => {
  const candidate = await findUserFromDbByEmail(email)
  if (!candidate) {
    throw ApiError.BadRequest(`User with ${email} not found`)
  }

  const isPassEquals = await bcrypt.compare(password, candidate.password)

  if (!isPassEquals) {
    throw ApiError.BadRequest('password incorrect')
  }
  const { userDto, tokens } = await generateUserData(candidate)

  return {
    user: userDto,
    tokens,
  }
}

export const refresh = async (refreshToken: string, userId: string) => {
  const isTokenValid = await validateRefreshToken(refreshToken)
  if (!isTokenValid) {
    return null
  }
  try {
    const user = await findUserById(userId)

    const { userDto, tokens } = await generateUserData(user)

    if (!userDto?.userId || !tokens) {
      return null
    }
    return {
      ...tokens,
      userId: userDto.userId,
    }
  } catch (e) {
    return null
  }
}

export const resetPassword = async (email: string, password: string) => {
  const candidate = await findUserFromDbByEmail(email)
  if (!candidate) {
    throw ApiError.BadRequest(`User with ${email} not found`)
  }
  const hashedPassword = await bcrypt.hash(password, 3)
  const user = await prisma.user.update({
    where: {
      id: candidate.id,
    },
    data: {
      password: hashedPassword,
    },
  })
  return await generateUserDto(user)
}
