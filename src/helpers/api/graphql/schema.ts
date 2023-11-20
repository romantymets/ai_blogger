import { gql } from '@apollo/client'

import { userResolver } from '@/helpers/api/graphql/resolvers/user.resolver'
import { dateScalar } from '@/helpers/api/graphql/scalars/dateScalar'
import { postResolver } from '@/helpers/api/graphql/resolvers/post.resolver'
import { authResolver } from '@/helpers/api/graphql/resolvers/auth.resolver'
import { favoriteResolver } from '@/helpers/api/graphql/resolvers/favorite.resolver'
import { commentResolver } from '@/helpers/api/graphql/resolvers/commnt.resolver'

import userSchema from '@/helpers/api/graphql/typeDefs/user.gql'
import postSchema from '@/helpers/api/graphql/typeDefs/post.gql'
import favoriteSchema from '@/helpers/api/graphql/typeDefs/favorite.gql'
import commentSchema from '@/helpers/api/graphql/typeDefs/comment.gql'
import authSchema from '@/helpers/api/graphql/typeDefs/auth.gql'

export const typeDefs = gql`
  ${postSchema}
  ${userSchema}
  ${favoriteSchema}
  ${commentSchema}
  ${authSchema}
`

export const resolvers = {
  Date: dateScalar,
  Query: {
    ...userResolver.Query,
    ...postResolver.Query,
    ...commentResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...favoriteResolver.Mutation,
    ...commentResolver.Mutation,
  },
}
