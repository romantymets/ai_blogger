import { GraphQLResolveInfo } from 'graphql/type'
import * as userService from '@/helpers/api/service/user-service'
import { ApolloContext } from '@/models/apolloContext'
import { isAuthenticated } from '@/utils/isAuthenticated'
import { UpdateUserCredential } from '@/helpers/validationSchema/updateUserValidationSchema'
import { saveS3Image } from '@/helpers/api/aws'
import { updateUser } from '@/helpers/api/service/user-service'
import { setCookies } from '@/utils/generateResponse'

export const userResolver = {
  Query: {
    async getAllUsers(
      _: any,
      args: Record<string, any>,
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      isAuthenticated(context?.user)
      return userService.getAllUsers()
    },
    async getUser(
      _: any,
      args: { id: string },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      isAuthenticated(context?.user)
      return userService.getUserById(args?.id)
    },
  },
  Mutation: {
    async deleteUser(
      _: any,
      args: { id: string },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      isAuthenticated(context?.user)
      return userService.deleteUser(args?.id)
    },
    async updateUser(
      _: any,
      args: {
        id: string
        input: UpdateUserCredential
        image?: File
      },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      isAuthenticated(context?.user)

      const { id, input } = args

      const fileName = await saveS3Image(args?.image)

      const { user, tokens } = await updateUser(id, {
        aboutUser: input?.aboutUser,
        userName: input?.userName,
        ...(fileName && { image: fileName }),
      })
      setCookies({ ...tokens, userId: user.userId })
      return user
    },
  },
}
