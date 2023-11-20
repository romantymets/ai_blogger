import { SignJWT, jwtVerify } from 'jose'

import { UserDto } from '@/models/userServiceModel'

export const generateTokens = async (payload: UserDto) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + Number(process.env.ACCESS_TOKEN_MAX_AGE) // Max age for ACCESS_TOKEN in seconds
  const refreshExp = iat + Number(process.env.REFRESH_TOKEN_MAX_AGE) // Max age for REFRESH_TOKEN in seconds

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

export const validateAccessToken = async (token?: string) => {
  if (!token) {
    return null
  }
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_ACCESS_SECRET as string)
    )
    return payload
  } catch (e) {
    return null
  }
}
