import { AuthenticationError, UserInputError } from 'apollo-server'

import MessageResolver from '../../../src/graphql/resolvers/message'
import MessageRepository from '../../../src/repositories/message'
import UserRepository from '../../../src/repositories/user'
import RoomRepository from '../../../src/repositories/room'

describe('Message', () => {
  describe('sender', () => {
    it('find user by sender id', async () => {
      const parent = { sender: '1' }

      const expectedResult = { id: '1', name: 'user1' }
      const findByIdMock = jest.fn(() => expectedResult)
      jest
        .spyOn(UserRepository.prototype, 'findById')
        .mockImplementationOnce(findByIdMock)
      const result = await MessageResolver.Message.sender(parent)

      expect(findByIdMock).toHaveBeenCalledWith('1')
      expect(result).toBe(expectedResult)
    })
  })
})

describe('Query', () => {
  describe('messages', () => {
    const parent = {}
    const context = { user: { id: '1' } }

    describe('room not found', () => {
      it('throw user input error', () => {
        const args = {}

        const findByIdMock = jest.fn(() => null)
        jest
          .spyOn(RoomRepository.prototype, 'findById')
          .mockImplementationOnce(findByIdMock)

        expect(MessageResolver.Query.messages(parent, args, context))
          .rejects
          .toBeInstanceOf(UserInputError)
      })
    })

    describe('room found', () => {
      it('find messages', async () => {
        const args = { roomId: '15' }

        const expectedResult = [{ id: '1', body: 'message' }]
        const findByIdMock = jest.fn(() => ({ id: '15' }))
        jest
          .spyOn(RoomRepository.prototype, 'findById')
          .mockImplementationOnce(findByIdMock)
        const findMock = jest.fn(() => expectedResult)
        jest
          .spyOn(MessageRepository.prototype, 'find')
          .mockImplementationOnce(findMock)

        const result = await MessageResolver.Query.messages(parent, args, context)

        expect(findMock).toHaveBeenCalledWith({
          sender: '1',
          room: '15'
        })
        expect(result).toBe(expectedResult)
      })
    })
  })
})

describe('Mutation', () => {
  describe('sendMessage', () => {
    describe('user is blank', () => {
      it('throw authentication error', () => {
        const parent = {}
        const args = {}
        const context = { user: null }

        expect(MessageResolver.Mutation.sendMessage(parent, args, context))
          .rejects
          .toBeInstanceOf(AuthenticationError)
      })
    })

    describe('user is present', () => {
      const parent = {}
      const context = { user: { id: '1' } }

      describe('room not found', () => {
        it('throw user input error', () => {
          const args = {}

          const findByIdMock = jest.fn(() => null)
          jest
            .spyOn(RoomRepository.prototype, 'findById')
            .mockImplementationOnce(findByIdMock)

          expect(MessageResolver.Mutation.sendMessage(parent, args, context))
            .rejects
            .toBeInstanceOf(UserInputError)
        })
      })

      describe('room found', () => {
        it('send messages', async () => {
          const args = { roomId: '15', body: 'message' }

          const expectedResult = [{ id: '1', body: 'message' }]
          const findByIdMock = jest.fn(() => ({ id: '15' }))
          jest
            .spyOn(RoomRepository.prototype, 'findById')
            .mockImplementationOnce(findByIdMock)
          const createMock = jest.fn(() => expectedResult)
          jest
            .spyOn(MessageRepository.prototype, 'create')
            .mockImplementationOnce(createMock)

          const result = await MessageResolver.Mutation.sendMessage(parent, args, context)

          expect(createMock).toHaveBeenCalledWith('1', '15', 'message')
          expect(result).toBe(expectedResult)
        })
      })
    })
  })
})
