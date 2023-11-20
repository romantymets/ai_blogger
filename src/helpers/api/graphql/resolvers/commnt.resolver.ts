import { GraphQLResolveInfo } from 'graphql/type'

import {
  createComment,
  deleteComment,
  getCommentsByPost,
} from '@/helpers/api/service/comment-service'

import { isAuthenticated } from '@/utils/isAuthenticated'
import { validation } from '@/helpers/api/validation/validation'
import { ApiError } from '@/helpers/api/exceptions/api-error'

import { commentValidationSchema } from '@/helpers/validationSchema/commentValidationSchema'

import { CreateCommentCredential } from '@/models/commentsModel'
import { ApolloContext } from '@/models/apolloContext'

export const commentResolver = {
  Query: {
    async getCommentsByPost(
      _: any,
      args: {
        id?: string
      },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      return getCommentsByPost(args.id)
    },
  },
  Mutation: {
    async deleteComment(
      _: any,
      args: { id: string },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      isAuthenticated(context?.user)
      return deleteComment(args?.id)
    },
    async createComment(
      _: any,
      args: {
        input: CreateCommentCredential
      },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      isAuthenticated(context?.user)
      try {
        const { isValid, errors, data } = await validation(
          commentValidationSchema,
          args.input
        )

        if (!isValid && !data) {
          throw new ApiError(422, errors[0], errors)
        }

        return await createComment(args.input)
      } catch (error) {
        console.log(error)
        return error
      }
    },
  },
}
