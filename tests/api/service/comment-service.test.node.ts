import { prisma } from '../../../jest.db.setup'
import * as commentService from '@/helpers/api/service/comment-service'
import * as awsService from '@/helpers/api/aws'

const { createComment, getCommentsByPost, findCommentsById, deleteComment } =
  commentService

describe('comment-service', () => {
  let userPayload
  let postPayload
  let user
  let post
  let testComment

  beforeEach(async () => {
    await prisma.user.deleteMany()

    await prisma.post.deleteMany()

    await prisma.comment.deleteMany()

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

    testComment = 'test comment'

    user = await prisma.user.create({ data: userPayload })

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
  }, 10000)

  it('should create comment', async () => {
    let result
    try {
      result = await createComment({
        authorId: user.id,
        postId: post.id,
        comment: testComment,
      })
    } catch (e) {
      console.log(e)
    }

    expect(result).toBeDefined()
    expect(result?.content).toEqual(testComment)
  })

  describe('test case with existing comments', () => {
    let testComments

    let comments

    beforeEach(async () => {
      comments = [
        {
          content: 'test-1',
          authorId: user.id,
          postId: post.id,
        },
        {
          content: 'test-2',
          authorId: user.id,
          postId: post.id,
        },
      ]

      await prisma.comment.createMany({ data: comments })
      testComments = await prisma.comment.findMany()
    })

    it('should get comments by post', async () => {
      let result
      try {
        result = await getCommentsByPost(post.id)
      } catch (e) {
        console.log(e)
      }

      expect(result).toBeDefined()
      expect(result).toHaveLength(2)
    })

    it('should find comment by id', async () => {
      let result

      const [firstComment = {}] = testComments || []

      try {
        result = await findCommentsById(firstComment?.id as string)
      } catch (e) {
        console.log(e)
      }

      expect(result).toBeDefined()
      expect(result.title).toEqual(comments[1].title)
    })

    it('should delete comment', async () => {
      const [firstComment = {}] = testComments || []
      let result
      let deletedComment
      try {
        deletedComment = await deleteComment(firstComment?.id as string)
        if (deletedComment) {
          result = await prisma.comment.findUnique({
            where: { id: deletedComment.id },
          })
        }
      } catch (e) {
        console.log(e)
      }
      expect(deletedComment).toBeDefined()
      expect(result).toBeNull()
    })
  })
})
