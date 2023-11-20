import { NextRequest } from 'next/server'

import { validateAccessToken } from '@/helpers/api/service/token-service'
import { setCookies } from '@/utils/generateResponse'
import { refresh } from '@/helpers/api/service/auth-service'

export const getLoggedInUser = async (request: NextRequest) => {
  const accessToken = request?.cookies?.get('accessToken' as any)
  const refreshToken = request?.cookies?.get('refreshToken' as any)
  const userId = request?.cookies?.get('userId' as any)

  if (!accessToken?.value && !refreshToken?.value) {
    return null
  }

  const isAssesTokenValid = await validateAccessToken(
    accessToken?.value as string
  )

  if (!isAssesTokenValid) {
    const userData = await refresh(refreshToken.value, userId.value)
    if (!userData) {
      return null
    } else {
      setCookies({
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
        userId: userData.userId,
      })
      return {
        userId: userData.userId,
      }
    }
  }

  return {
    userId: userId?.value,
  }
}
