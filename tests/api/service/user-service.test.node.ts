import { prisma } from '../../../jest.db.setup'
import bcrypt from 'bcrypt'
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  findUserById,
} from '@/helpers/api/service/user-service'
import * as authService from '@/helpers/api/service/auth-service'
import * as awsService from '@/helpers/api/aws'

describe('user-service', () => {
  let payload
  beforeEach(async () => {
    await prisma.user.deleteMany()
    ;(bcrypt.hash as jest.Mock) = jest.fn().mockReturnValue('hashedPassword')

    payload = {
      email: 'test@example.com',
      password: 'testpassword',
      userName: 'testuser',
      aboutUser: 'Testing user',
      image: 'testimage.jpg',
    }
  }, 10000)

  describe('create user', () => {
    let findByEmailMock

    beforeEach(() => {
      findByEmailMock = jest.spyOn(authService, 'findUserFromDbByEmail')
    })

    it('should create a new user', async () => {
      findByEmailMock.mockResolvedValue(null)

      let newUser
      let savedUser
      try {
        newUser = await createUser(payload)
        if (newUser) {
          savedUser = await prisma.user.findUnique({
            where: { id: newUser.id },
          })
        }
      } catch (e) {
        console.log(e)
      }

      expect(savedUser).toBeDefined()
    })

    it('should throw error when user with email exist', async () => {
      findByEmailMock.mockResolvedValue(payload)

      let user
      let savedUser
      let errorMessage

      try {
        user = await createUser(payload)
      } catch (e) {
        user = null
        errorMessage = e.message
      }

      if (user) {
        savedUser = await prisma.user.findUnique({
          where: { id: user?.id },
        })
      }
      expect(savedUser).not.toBeDefined()
      expect(errorMessage).toEqual('user with test@example.com already exist')
    })
  })

  describe('test case with existing user', () => {
    let user
    beforeEach(async () => {
      user = await prisma.user.create({ data: payload })
      ;(awsService.deleteS3image as jest.Mock) = jest
        .fn()
        .mockResolvedValue(undefined)
    })

    it('should find user by id', async () => {
      let result

      try {
        result = await findUserById(user.id)
      } catch (e) {
        console.log(e)
      }

      expect(result).toBeDefined()
      expect(result?.userName).toEqual(payload.userName)
    })

    it('should update user', async () => {
      let updatedUser

      try {
        updatedUser = await updateUser(user.id, {
          ...payload,
          userName: 'updatedUser',
        })
      } catch (e) {
        console.log(e)
      }

      const userName = updatedUser?.user?.userName
      expect(updatedUser).toBeDefined()
      expect(userName).toEqual('updatedUser')
    })

    it('should get all users', async () => {
      expect(user).toBeDefined()

      const users = await getAllUsers()

      expect(users).toBeDefined()
      expect(users?.length).toBeGreaterThan(0)
    })

    it('should delete user', async () => {
      let deletedUser
      let result

      try {
        deletedUser = await deleteUser(user?.id)

        if (deletedUser) {
          result = await prisma.user.findUnique({
            where: { id: deletedUser.id },
          })
        }
      } catch (e) {
        console.log(e)
      }
      expect(deletedUser).toBeDefined()
      expect(result).toBeNull()
    })
  })
})
