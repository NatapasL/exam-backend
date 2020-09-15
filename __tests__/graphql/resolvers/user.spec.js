import UserResolver from '../../../src/graphql/resolvers/user'
import UserRepository from '../../../src/repositories/user'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Query', () => {
  describe('users', () => {
    it('find user', async () => {
      const parent = {}
      const args = { name: 'user1' }

      const expectedResult = [{ id: '1', name: 'user1' }]
      const findMock = jest.fn(() => expectedResult)
      jest
        .spyOn(UserRepository.prototype, 'find')
        .mockImplementationOnce(findMock)
      const result = await UserResolver.Query.users(parent, args)

      expect(findMock).toHaveBeenCalledWith({ name: 'user1' })
      expect(result).toBe(expectedResult)
    })
  })
})

describe('Mutation', () => {
  describe('createUser', () => {
    it('create user', async () => {
      const parent = {}
      const args = { name: 'user1' }

      const expectedResult = { id: '1', name: 'user1' }
      const createMock = jest.fn(() => expectedResult)
      jest
        .spyOn(UserRepository.prototype, 'create')
        .mockImplementationOnce(createMock)
      const result = await UserResolver.Mutation.createUser(parent, args)

      expect(createMock).toHaveBeenCalledWith('user1')
      expect(result).toBe(expectedResult)
    })
  })
})
