import { NextRequest } from 'next/server'
import { createSchema, createYoga } from 'graphql-yoga'

import { typeDefs, resolvers } from '@/helpers/api/graphql/schema'
import { getLoggedInUser } from '@/utils/getLoggedInUser'

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
  cors: {
    credentials: true,
  },
  context: async (data) => {
    return { user: await getLoggedInUser(data?.request as NextRequest) }
  },
})

export { handleRequest as GET, handleRequest as POST }
