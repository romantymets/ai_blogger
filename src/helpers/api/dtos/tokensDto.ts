import { User } from 'prisma/prisma-client'

export const generateTokensDto = async (user: User) => {
  return {
    email: user.email,
    userId: user.id,
    userName: user.userName,
  }
}
