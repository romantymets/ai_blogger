import { GraphQLError } from 'graphql/error'
import { IAuthenticatedUser } from '@/models/apolloContext'

export const isAuthenticated = (user?: IAuthenticatedUser) => {
  if (!user)
    // throwing a `GraphQLError` here allows us to specify an HTTP status code,
    // standard `Error`s will have a 500 status code by default
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        status: 401,
        http: { status: 401 },
      },
    })

  return user
}
