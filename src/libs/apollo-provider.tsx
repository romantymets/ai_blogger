'use client'
import { ApolloLink } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import React from 'react'
import { onError } from '@apollo/client/link/error'

function makeClient() {
  const httpLink = createUploadLink({
    uri: `${process.env.CANONICAL_URL}/api/graphql`,
    credentials: 'include',
  })

  const linkError = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }: any) => {
        if (extensions?.code === 'UNAUTHENTICATED') {
          console.log('UNAUTHENTICATED')
        }
      })
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
    }
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            linkError,
            httpLink,
          ])
        : ApolloLink.from([linkError, httpLink]),
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
