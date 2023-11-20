import { GraphQLScalarType } from 'graphql'

export const dateScalar = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value?: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new Date(value)
    },
    serialize(value) {
      return (value as Date)?.toISOString() // value sent to the client
    },
  }),
}
