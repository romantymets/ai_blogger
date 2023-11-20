import { prisma } from '../../../jest.db.setup'
import {
  createFavorite,
  deleteFavorite,
} from '@/helpers/api/service/favorite-service'

describe('favorite-service', () => {
  let userPayload
  let postPayload
  let user
  let post

  beforeEach(async () => {
    await prisma.user.deleteMany()

    await prisma.post.deleteMany()

    await prisma.favoritePostByUser.deleteMany()

    userPayload = {
      email: 'adminTest@example.com',
      password: 'testpassword',
      userName: 'adminTest',
      aboutUser: 'Testing user',
    }

    postPayload = {
      title: 'test post title',
      content: 'test post content',
      subtitle: 'test post subtitle',
    }

    user = await prisma.user.create({ data: userPayload })

    post = await prisma.post.create({
      data: {
        authorId: user.id,
        ...postPayload,
      },
    })
  }, 10000)

  it('should create favorite', async () => {
    let result
    try {
      result = await createFavorite({
        userId: user.id,
        postId: post.id,
      })
    } catch (e) {
      console.log(e)
    }

    expect(result).toBeDefined()
  })

  it('should delete favorite', async () => {
    let result
    try {
      const favorite = await prisma.favoritePostByUser.create({
        data: {
          userId: user.id,
          postId: post.id,
        },
      })
      result = await deleteFavorite(favorite?.id)
    } catch (e) {
      console.log(e)
    }

    const deletedFavorite = await prisma.favoritePostByUser.findUnique({
      where: {
        id: result.id,
      },
    })

    expect(result).toBeDefined()
    expect(deletedFavorite).toBeNull()
  })
})
