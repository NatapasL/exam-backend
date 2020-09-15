
import express from 'express'
import { createServer } from 'http'
import { ApolloServer, gql } from 'apollo-server-express';

import { typeDefs } from '../../graphql/typedefs'
import { resolvers } from '../../graphql/resolvers'
import { context } from './context'

const app = express()

const apolloServer = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
  context,
})
apolloServer.applyMiddleware({ app })

const server = createServer(app)
apolloServer.installSubscriptionHandlers(server)

export default server
