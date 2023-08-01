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
import { generateTokensDto } from '@/helpers/api/dtos/tokensDto'

export const findUserFromDbByEmail = async (email: string) =>
  await prisma.users.findUnique({
    where: {
      email,
    },
  })

export const registration = async (payload: CreateUserCredential) => {
  const candidate = await createUser(payload)

  const userDto = await generateUserDto(candidate)
  const tokensDto = await generateTokensDto(candidate)
  const tokens = await generateTokens(tokensDto)
  await saveToken(userDto.userId, tokens.refreshToken)
  return {
    ...tokens,
    ...userDto,
  }
}

export const login = async (email: string, password: string) => {
  const candidate = await findUserFromDbByEmail(email)
  if (!candidate) {
    throw ApiError.BadRequest(`User with ${email} not found`)
  }

  const isPassEquals = await bcrypt.compare(password, candidate.hashedPassword)

  if (!isPassEquals) {
    throw ApiError.BadRequest('password incorrect')
  }
  const userDto = await generateUserDto(candidate)
  const tokensDto = await generateTokensDto(candidate)
  const tokens = await generateTokens(tokensDto)
  await saveToken(candidate.id, tokens.refreshToken)
  return {
    ...tokens,
    ...userDto,
  }
}

const logout = async (refreshToken: string) => await removeToken(refreshToken)

export const refresh = async (refreshToken: string) => {
  if (!refreshToken) {
    throw ApiError.BadRequest('Token not found')
  }
  const isTokenValid = await validateRefreshToken(refreshToken)
  const tokenfromDB = await findToken(refreshToken)
  if (!isTokenValid || !tokenfromDB) {
    throw ApiError.BadRequest('Token not valid')
  }
  const user = await prisma.users.findUnique({
    where: {
      id: tokenfromDB.userId,
    },
  })
  const userDto = await generateUserDto(user)
  const tokensDto = await generateTokensDto(user)
  const tokens = await generateTokens(tokensDto)
  await saveToken(userDto.userId, tokens.refreshToken)
  return {
    ...tokens,
    ...userDto,
  }
}

export const resetPassword = async (email: string, password: string) => {
  const candidate = await findUserFromDbByEmail(email)
  if (!candidate) {
    throw ApiError.BadRequest(`User with ${email} not found`)
  }
  const hashedPassword = await bcrypt.hash(password, 3)
  const user = await prisma.users.update({
    where: {
      id: candidate.id,
    },
    data: {
      hashedPassword,
    },
  })
  return await generateUserDto(user)
}
