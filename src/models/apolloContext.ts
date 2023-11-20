import { NextRequest } from 'next/server'

export interface IAuthenticatedUser {
  userId: string
}

export interface ApolloContext {
  request: NextRequest
  params: any
  user: IAuthenticatedUser | null
}
