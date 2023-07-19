import prisma from '@/libs/prisma'
import { CreateUserCredential } from '@/models/userServiceModel'
import bcrypt from 'bcrypt'
import {
  findToken,
  generateTokens,
  removeToken,
  saveToken,
  validateRefreshToken,
} from '@/helpers/api/service/token-service'
import { createUser } from '@/helpers/api/service/user-service'
import { generateUserDto } from '@/helpers/api/dtos/userDto'
import { ApiError } from '@/helpers/api/exceptions/api-error'
import { generateImageUrl } from '@/helpers/api/aws'

export const findUserFromDbByEmail = async (email: string) =>
  await prisma.users.findUnique({
    where: {
      email,
    },
  })

export const registration = async (payload: CreateUserCredential) => {
  const user = await createUser(payload)

  const userDto = generateUserDto(user)

  const tokens = await generateTokens(userDto)
  await saveToken(userDto.userId, tokens.refreshToken)
  return {
    ...tokens,
    user: userDto,
  }
}

export const login = async (email: string, password: string) => {
  const candidate = await findUserFromDbByEmail(email)
  if (!candidate) {
    throw ApiError.BadRequest(`user with ${email} not found`)
  }

  const isPassEquals = await bcrypt.compare(password, candidate.hashedPassword)

  if (!isPassEquals) {
    throw ApiError.BadRequest('password incorrect')
  }
  const userDto = generateUserDto(candidate)
  const tokens = await generateTokens(userDto)
  await saveToken(userDto.userId, tokens.refreshToken)
  return {
    ...tokens,
    user: {
      ...userDto,
      image: candidate?.image ? await generateImageUrl(candidate.image) : null,
    },
  }
}

// TODO next task
const logout = async (refreshToken: string) => await removeToken(refreshToken)

// TODO next task
const refresh = async (refreshToken: string) => {
  if (!refreshToken) {
    throw ApiError.BadRequest('Unauthorized')
  }
  const userData = await validateRefreshToken(refreshToken)
  const tokenfromDB = await findToken(refreshToken)
  if (!userData || !tokenfromDB) {
    throw ApiError.BadRequest('Unauthorized')
  }
  const user = await prisma.users.findUnique({
    where: {
      id: tokenfromDB.userId,
    },
  })
  const userDto = generateUserDto(user)
  const tokens = await generateTokens(userDto)
  await saveToken(userDto.userId, tokens.refreshToken)
  return {
    ...tokens,
    user: userDto,
  }
}
