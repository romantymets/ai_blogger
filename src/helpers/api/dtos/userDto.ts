import { Users } from 'prisma/prisma-client'

export const generateUserDto = (user: Users) => {
  return {
    email: user.email,
    userId: user.id,
    userName: user.userName,
  }
}
