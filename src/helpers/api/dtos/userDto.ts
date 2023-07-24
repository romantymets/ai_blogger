import { Users } from 'prisma/prisma-client'
import { generateImageUrl } from '@/helpers/api/aws'

export const generateUserDto = async (user: Users) => {
  return {
    email: user.email,
    userId: user.id,
    userName: user.userName,
    image: user?.image ? await generateImageUrl(user.image) : null,
  }
}
