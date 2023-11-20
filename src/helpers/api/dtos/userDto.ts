import { User } from 'prisma/prisma-client'
import { generateImageUrl } from '@/helpers/api/aws'

export const generateUserDto = async (user: User) => {
  return {
    email: user.email,
    userId: user.id,
    userName: user.userName,
    aboutUser: user?.aboutUser,
    image: user?.image ? await generateImageUrl(user.image) : null,
  }
}
