import { ApolloServer, gql } from 'apollo-server';

import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';

import './infra/mongoose'
import UserRepository from './repositories/user'

const server = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
  context: async ({ req }) => {
    const { userid } = req.headers

    const userRepository = new UserRepository()
    const user = await userRepository.findById(userid)

    return { user }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
