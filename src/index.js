import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose'

import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';

import './infra/mongoose'
import UserRepository from './repositories/user_repository'

const server = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
  context: async ({ req }) => {
    const { userid } = req.headers

    const userRepository = new UserRepository()
    const user = await userRepository.findOne({
      _id: mongoose.Types.ObjectId(userid)
    })

    return { user }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
