import { ApolloServer, gql } from 'apollo-server';

import { typeDefs } from '../../graphql/typedefs'
import { resolvers } from '../../graphql/resolvers'
import { context } from './context'

const server = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
  context,
})

export default server
