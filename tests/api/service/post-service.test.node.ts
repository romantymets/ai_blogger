import { prisma } from '../../../jest.db.setup'
import * as postService from '@/helpers/api/service/post-service'
import * as awsService from '@/helpers/api/aws'

const { createPost, updatePost, deletePost, findPostById, getAllPosts } =
  postService

describe('post-service', () => {
  let userPayload
  let postPayload
  let user
  beforeEach(async () => {
    await prisma.user.deleteMany()

    await prisma.post.deleteMany()

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
  }, 10000)

  describe('create post', () => {
    it('should create a new post', async () => {
      let savedPost
      try {
        const newPost = await createPost({ id: user.id, ...postPayload })
        if (newPost) {
          savedPost = await prisma.post.findUnique({
            where: { id: newPost.id },
          })
        }
      } catch (e) {
        console.log(e)
      }

      expect(savedPost).toBeDefined()
    })

    it('should throw error when user not exist', async () => {
      let savedPost
      let errorMessage
      try {
        savedPost = await createPost({
          id: '64db25b396a316b5e73fa265',
          ...postPayload,
        })
      } catch (e) {
        savedPost = null
        errorMessage = e?.message
      }

      expect(savedPost).toBeNull()
      expect(errorMessage).toEqual('User not found')
    })
  })

  describe('test case with existing post', () => {
    let post
    beforeEach(async () => {
      post = await prisma.post.create({
        data: {
          authorId: user.id,
          ...postPayload,
        },
      })
      ;(awsService.deleteS3image as jest.Mock) = jest
        .fn()
        .mockResolvedValue(undefined)
      ;(awsService.generateImageUrl as jest.Mock) = jest
        .fn()
        .mockResolvedValue(null)
    })

    it('should find post by id', async () => {
      let result
      try {
        result = await findPostById(post.id)
      } catch (e) {
        console.log(e)
      }

      expect(result).toBeDefined()
      expect(result?.id).toEqual(post?.id)
    })

    it('should update post', async () => {
      let updatedPost
      const newTitle = 'updated post title'

      try {
        updatedPost = await updatePost({
          ...postPayload,
          title: newTitle,
          id: post.id,
        })
      } catch (e) {
        console.log(e)
      }

      expect(updatedPost).toBeDefined()
      expect(updatedPost.title).toEqual(newTitle)
    })

    it('should get all posts by author', async () => {
      expect(user).toBeDefined()

      let total
      let posts

      try {
        const result = await getAllPosts({
          include: {
            author: true,
            comments: true,
            likes: true,
          },
        })
        total = result?.total
        posts = result?.posts
      } catch (e) {
        console.log(e)
      }

      expect(posts).toBeDefined()
      expect(total).toEqual(1)
    })

    it('should delete post', async () => {
      let result
      let deletedPost
      try {
        deletedPost = await deletePost(post?.id)
        if (deletedPost) {
          result = await prisma.post.findUnique({
            where: { id: deletedPost.id },
          })
        }
      } catch (e) {
        console.log(e)
      }
      expect(deletedPost).toBeDefined()
      expect(result).toBeNull()
    })
  })
})
