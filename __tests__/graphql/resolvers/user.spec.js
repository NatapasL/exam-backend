import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';

import { typeDefs } from '../../../src/graphql/typedefs';
import { resolvers } from '../../../src/graphql/resolvers';
import UserRepository from '../../../src/repositories/user'

const server = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers
});

const { query, mutate } = createTestClient(server);

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Query', () => {
  describe('users', () => {
    const message = gql`
      query ($name: String) {
        users(name: $name) {
          id
          name
        }
      }
    `
    it('find users', async () => {
      const variables = { name: 'user1' }
      const expectedResult = [{
        id: '1234',
        name: 'user1'
      }]
      const findMock = jest.fn(() => [{ id: '1234', name: 'user1' }])
      jest
        .spyOn(UserRepository.prototype, 'find')
        .mockImplementationOnce(findMock)

      const {
        data: {
          users
        }
      } = await query({
        query: message,
        variables,
      })

      expect(findMock).toHaveBeenCalledWith({ name: variables.name })
      expect(users).toEqual(expectedResult)
    })
  })
})

describe('Mutation', () => {
  describe('createUser', () => {
    const message = gql`
      mutation ($name: String!) {
        createUser(name: $name) {
          id
          name
        }
      }
    `

    it('create user', async () => {
      const variables = { name: 'user1' }
      const expectedResult = {
        id: '1234',
        name: 'user1'
      }
      const createMock = jest.fn(() => ({ id: '1234', name: 'user1' }))
      jest
        .spyOn(UserRepository.prototype, 'create')
        .mockImplementationOnce(createMock)

      const {
        data: {
          createUser
        }
      } = await mutate({
        mutation: message,
        variables,
      })

      expect(createMock).toHaveBeenCalledWith(variables.name)
      expect(createUser).toEqual(expectedResult)
    })
  })
})
