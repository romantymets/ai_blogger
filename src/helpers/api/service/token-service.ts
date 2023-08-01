import { SignJWT, jwtVerify } from 'jose'
import prisma from '@/libs/prisma'

import { UserDto } from '@/models/userServiceModel'

export const generateTokens = async (payload: UserDto) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 * 24 // one day
  const refreshExp = iat + 60 * 60 * 24 * 30

  const accessToken = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_ACCESS_SECRET as string))

  const refreshToken = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(refreshExp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_REFRESH_SECRET as string))

  return { accessToken, refreshToken }
}

export const validateRefreshToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_REFRESH_SECRET as string)
    )
    return payload
  } catch (e) {
    return null
  }
}

export const saveToken = async (userId: string, refreshToken: string) => {
  const tokenData = await prisma.accounts.findUnique({
    where: {
      userId,
    },
  })
  if (tokenData) {
    tokenData.refresh_token = refreshToken
    await prisma.accounts.update({
      where: {
        userId,
      },
      data: {
        refresh_token: refreshToken,
      },
    })
    return tokenData
  } else {
    return await prisma.accounts.create({
      data: {
        refresh_token: refreshToken,
        userId,
      },
    })
  }
}

export const removeToken = async (refreshToken: string) =>
  await prisma.accounts.delete({
    where: {
      refresh_token: refreshToken,
    },
  })

export const findToken = async (refreshToken: string) =>
  await prisma.accounts.findUnique({
    where: {
      refresh_token: refreshToken,
    },
  })
