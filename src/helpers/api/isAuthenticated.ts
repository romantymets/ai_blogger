import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const validateAccessToken = async (token: string) => {
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

export async function isAuthenticated(req: NextRequest) {
  try {
    const authorizationHeaders = req.headers.get('authorization')
    if (!authorizationHeaders) {
      return
    }
    const accessToken = authorizationHeaders.split(' ')[1]
    if (!accessToken) {
      return
    }
    return await validateAccessToken(accessToken)
  } catch (e) {
    console.error(e)
    return null
  }
}
