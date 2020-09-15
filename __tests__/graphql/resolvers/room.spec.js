import { AuthenticationError } from 'apollo-server'

import RoomResolver from '../../../src/graphql/resolvers/room'
import RoomRepository from '../../../src/repositories/room'
import UserRepository from '../../../src/repositories/user'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Room', () => {
  describe('owner', () => {
    it('find user by owner id', async () => {
      const ownerId = '1'
      const parent = { owner: ownerId }
      const expectedResult = {
        id: '1',
        name: 'owner1',
      }
      const findByIdMock = jest.fn(() => expectedResult)
      jest
        .spyOn(UserRepository.prototype, 'findById')
        .mockImplementationOnce(findByIdMock)

      const result = await RoomResolver.Room.owner(parent)

      expect(findByIdMock).toHaveBeenCalledWith(ownerId)
      expect(result).toBe(expectedResult)
    })
  })

  describe('participants', () => {
    it('find participants by id', async () => {
      const participantIds = ['1', '2']
      const parent = { participants: participantIds }

      const expectedResult = [
        { id: '1', name: 'user1' },
        { id: '2', name: 'user2' },
      ]
      const findMock = jest.fn(() => expectedResult)
      jest
        .spyOn(UserRepository.prototype, 'find')
        .mockImplementationOnce(findMock)

      const result = await RoomResolver.Room.participants(parent)

      expect(findMock).toHaveBeenCalledWith({ _id: participantIds })
      expect(result).toBe(expectedResult)
    })
  })
})

describe('Query', () => {
  describe('rooms', () => {
    describe('user is blank', () => {
      it('throw authentication error', () => {
        const parent = {}
        const args = {}
        const context = { user: null }

        expect(RoomResolver.Query.rooms(parent, args, context))
          .rejects
          .toBe(AuthenticationError)
      })
    })

    describe('user is present', () => {
      it('find rooms', async () => {
        const parent = {}
        const args = { name: 'room1' }
        const context = { user: { id: '1' } }

        const expectedResult = [{ id: 1, name: 'room1' }]
        const findMock = jest.fn(() => expectedResult)
        jest
          .spyOn(RoomRepository.prototype, 'find')
          .mockImplementationOnce(findMock)
        const result = await RoomResolver.Query.rooms(parent, args, context)

        expect(findMock).toHaveBeenCalledWith({ name: 'room1', owner: '1' })
        expect(result).toBe(expectedResult)
      })
    })
  })
})

describe('Mutation', () => {
  describe('createRoom', () => {
    describe('user is blank', () => {
      it('throw authentication error', () => {
        const parent = {}
        const args = {}
        const context = { user: null }

        expect(RoomResolver.Mutation.createRoom(parent, args, context))
          .rejects
          .toBe(AuthenticationError)
      })
    })

    describe('user is present', () => {
      it('find rooms', async () => {
        const parent = {}
        const args = { name: 'room1' }
        const context = { user: { id: '1' } }

        const expectedResult = { id: 1, name: 'room1' }
        const createMock = jest.fn(() => expectedResult)
        jest
          .spyOn(RoomRepository.prototype, 'create')
          .mockImplementationOnce(createMock)
        const result = await RoomResolver.Mutation.createRoom(parent, args, context)

        expect(createMock).toHaveBeenCalledWith('room1', '1')
        expect(result).toBe(expectedResult)
      })
    })
  })
})
