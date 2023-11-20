import { GraphQLResolveInfo } from 'graphql/type'

import {
  createPost,
  deletePost,
  findPostById,
  getAllPosts,
  getResentPosts,
  updatePost,
} from '@/helpers/api/service/post-service'
import { saveS3Image } from '@/helpers/api/aws'

import { generatePostListQuery } from '@/utils/generatePostListQuery'
import { generateSearchQuery } from '@/utils/generateSearchQuery'
import { isAuthenticated } from '@/utils/isAuthenticated'

import { ApiError } from '@/helpers/api/exceptions/api-error'

import { validation } from '@/helpers/api/validation/validation'
import { postValidationSchema } from '@/helpers/validationSchema/postValidationSchema'

import { CreatePostCredential } from '@/models/postsServiceModel'
import { ApolloContext } from '@/models/apolloContext'

export const postResolver = {
  Query: {
    async getPosts(
      _: any,
      args: {
        page?: string
        sortOrder?: string
      },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      const { page, sortOrder } = args || {}
      return getAllPosts(generatePostListQuery(Number(page), sortOrder))
    },
    async getSearchPosts(
      _: any,
      args: {
        search?: string
      },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      return getAllPosts(generateSearchQuery(args.search))
    },
    async getPost(
      _: any,
      args: {
        id: string
      },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      return await findPostById(args.id)
    },
    async getResentPosts(
      _: any,
      args: {
        id: string
      },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      return getResentPosts(args.id)
    },
  },
  Mutation: {
    async deletePost(
      _: any,
      args: { id: string },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      isAuthenticated(context?.user)
      return deletePost(args?.id)
    },
    async updatePost(
      _: any,
      args: {
        input: CreatePostCredential
        image?: File
      },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      isAuthenticated(context?.user)
      try {
        const { input, image } = args
        const { isValid, errors, data } = await validation(
          postValidationSchema,
          input
        )

        if (!isValid && !data) {
          throw new ApiError(422, errors[0], errors)
        }

        const fileName = await saveS3Image(image, {
          width: 1440,
          height: 800,
        })

        return await updatePost({
          ...input,
          ...(fileName && { image: fileName }),
        })
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async createPost(
      _: any,
      args: {
        input: CreatePostCredential
        image?: File
      },
      context: ApolloContext,
      info: GraphQLResolveInfo
    ) {
      isAuthenticated(context?.user)
      try {
        const { input, image } = args
        const { isValid, errors, data } = await validation(
          postValidationSchema,
          input
        )

        if (!isValid && !data) {
          throw new ApiError(422, errors[0], errors)
        }

        const fileName = await saveS3Image(image, {
          width: 1440,
          height: 800,
        })

        return await createPost({
          ...input,
          ...(fileName && { image: fileName }),
        })
      } catch (error) {
        console.log(error)
        return error
      }
    },
  },
}
