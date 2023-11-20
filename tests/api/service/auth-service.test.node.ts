import { prisma } from '../../../jest.db.setup'
import bcrypt from 'bcrypt'

import * as authService from '@/helpers/api/service/auth-service'
import { generateTokens } from '@/helpers/api/service/token-service'
import * as tokensDtoService from '@/helpers/api/dtos/tokensDto'
import * as userDtoService from '@/helpers/api/dtos/userDto'

const { registration, login, resetPassword, generateUserData } = authService

describe('auth-service', () => {
  let payload
  let tokensPayload
  let findUserFromDbByEmailMock
  beforeEach(async () => {
    await prisma.user.deleteMany()
    findUserFromDbByEmailMock = jest.spyOn(authService, 'findUserFromDbByEmail')
    ;(bcrypt.hash as jest.Mock) = jest.fn().mockReturnValue('hashedPassword')
    ;(bcrypt.compare as jest.Mock) = jest.fn().mockReturnValue(true)
    ;(generateTokens as jest.Mock) = jest.fn().mockResolvedValue({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    })

    tokensPayload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    }

    payload = {
      email: 'testNewUser@example.com',
      password: 'testpassword12345',
      userName: 'testuser',
      aboutUser: 'Testing user',
    }
  }, 10000)

  describe('registration user', () => {
    it('should registered a new user', async () => {
      const result = await registration(payload)

      const savedUser = await prisma.user.findUnique({
        where: { id: result?.user?.userId },
      })
      expect(savedUser).toBeDefined()
      expect(generateTokens).toHaveBeenCalled()
      expect(result.tokens).toMatchObject(tokensPayload)
    })

    it('should return error if user already exist', async () => {
      let user
      let savedUser
      let errorMessage

      findUserFromDbByEmailMock.mockResolvedValueOnce(payload)

      try {
        user = await registration(payload)
        if (user) {
          savedUser = await prisma.user.findUnique({
            where: { id: user?.id },
          })
        }
      } catch (e) {
        user = null
        errorMessage = e.message
      }

      expect(savedUser).not.toBeDefined()
      expect(errorMessage).toEqual(`user with ${payload.email} already exist`)
      expect(findUserFromDbByEmailMock).toHaveBeenCalled()
    })
  })

  describe('test case with existing user', () => {
    let user

    beforeEach(async () => {
      user = await prisma.user.create({ data: payload })
    })

    it('generate user data', async () => {
      const generateUserDtoMock = jest.spyOn(userDtoService, 'generateUserDto')
      const generateTokensDtoMock = jest.spyOn(
        tokensDtoService,
        'generateTokensDto'
      )
      const res = await generateUserData(user)
      expect(res).toBeDefined()
      expect(generateTokens).toHaveBeenCalled()
      expect(generateUserDtoMock).toHaveBeenCalled()
      expect(generateTokensDtoMock).toHaveBeenCalled()
      expect(res.tokens).toMatchObject(tokensPayload)
      expect(res.userDto?.email).toEqual(payload.email)
    })

    describe('login', () => {
      it('should login', async () => {
        let result
        try {
          result = await login(payload.email, payload.password)
        } catch (e) {
          console.log(e)
        }

        expect(result).toBeDefined()
        expect(findUserFromDbByEmailMock).toHaveBeenCalled()
        expect(result.tokens).toMatchObject(tokensPayload)
      })

      it('should return error if user not exist', async () => {
        let user
        let errorMessage

        const email = 'notExistingUser@gmail.com'

        try {
          user = await login(email, '12345asdf')
        } catch (e) {
          user = null
          errorMessage = e.message
        }

        expect(user).toBeNull()
        expect(errorMessage).toEqual(`User with ${email} not found`)
        expect(findUserFromDbByEmailMock).toHaveBeenCalled()
      })
    })

    it('reset password', async () => {
      const newPassword = 'newHashedPassword'
      ;(bcrypt.hash as jest.Mock) = jest.fn().mockResolvedValueOnce(newPassword)
      let res
      let updatedUser
      try {
        res = await resetPassword(payload.email, newPassword)
        if (res) {
          updatedUser = await prisma.user.findUnique({
            where: {
              id: res?.userId,
            },
          })
        }
      } catch (e) {
        console.log(e)
      }
      expect(updatedUser).toBeDefined()
      expect(updatedUser?.password).toEqual(newPassword)
    })
  })
})
