import { GraphQLResolveInfo } from 'graphql/type'

import {
  createFavorite,
  deleteFavorite,
} from '@/helpers/api/service/favorite-service'

import { isAuthenticated } from '@/utils/isAuthenticated'
import { validation } from '@/helpers/api/validation/validation'
import { ApiError } from '@/helpers/api/exceptions/api-error'

import { favoriteValidationSchema } from '@/helpers/validationSchema/favoriteValidationSchema'
import { CreateFavoriteCredential } from '@/models/favoriteModel'
import { ApolloContext } from '@/models/apolloContext'

export const favoriteResolver = {
  Mutation: {
    async deleteFavorite(
      _: any,
      args: { id: string },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      isAuthenticated(context?.user)
      return deleteFavorite(args?.id)
    },
    async createFavorite(
      _: any,
      args: CreateFavoriteCredential,
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      isAuthenticated(context?.user)
      try {
        const { isValid, errors, data } = await validation(
          favoriteValidationSchema,
          args
        )

        if (!isValid && !data) {
          throw new ApiError(422, errors[0], errors)
        }

        return await createFavorite(args)
      } catch (error) {
        console.log(error)
        return error
      }
    },
  },
}
