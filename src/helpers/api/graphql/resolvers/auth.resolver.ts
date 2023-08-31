import { cookies } from 'next/headers'
import { GraphQLResolveInfo } from 'graphql/type'

import * as authService from '@/helpers/api/service/auth-service'
import { saveS3Image } from '@/helpers/api/aws'
import { validation } from '@/helpers/api/validation/validation'
import { ApiError } from '@/helpers/api/exceptions/api-error'

import { setCookies } from '@/utils/generateResponse'

import {
  RegistrationCredential,
  registrationValidationSchema,
} from '@/helpers/validationSchema/registrationValidationSchema'
import {
  LoginCredential,
  loginValidationSchema,
} from '@/helpers/validationSchema/loginValidationSchema'
import {
  ResetPasswordCredential,
  resetPasswordValidationSchema,
} from '@/helpers/validationSchema/resetPasswordValidationSchema'

import { ApolloContext } from '@/models/apolloContext'

interface AuthInput {
  input: RegistrationCredential
  image?: File
}

export const authResolver = {
  Mutation: {
    async registration(
      _: any,
      args: AuthInput,
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      try {
        const { isValid, errors, data } = await validation(
          registrationValidationSchema,
          args?.input
        )

        if (!isValid && !data) {
          throw new ApiError(422, errors[0], errors)
        }

        const fileName = await saveS3Image(args?.image)

        const { user } = await authService.registration({
          ...args?.input,
          ...(fileName && { image: fileName }),
        })
        return user
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async login(
      _,
      args: LoginCredential,
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      try {
        const { isValid, errors, data } = await validation(
          loginValidationSchema,
          args
        )

        if (!isValid && !data) {
          throw new ApiError(422, errors[0], errors)
        }
        const { user, tokens } = await authService.login(
          args?.email,
          args?.password
        )
        setCookies({ ...tokens, userId: user.userId })
        return user
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async resetPassword(
      _,
      args: ResetPasswordCredential,
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      try {
        const { isValid, errors, data } = await validation(
          resetPasswordValidationSchema,
          args
        )

        if (!isValid && !data) {
          throw new ApiError(422, errors[0], errors)
        }
        return await authService.resetPassword(args?.email, args?.password)
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async logout(
      _,
      args: ResetPasswordCredential,
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      const cookieStore = cookies()
      cookieStore.delete('accessToken' as any)
      cookieStore.delete('userId' as any)
      cookieStore.delete('refreshToken' as any)
      return { success: true }
    },
  },
}
