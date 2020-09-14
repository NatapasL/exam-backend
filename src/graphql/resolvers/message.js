import { AuthenticationError, UserInputError } from 'apollo-server'

import MessageRepository from '../../repositories/message'
import UserRepository from '../../repositories/user'
import RoomRepository from '../../repositories/room'

const messageRepository = new MessageRepository()
const userRepository = new UserRepository()
const roomRepository = new RoomRepository()

const findRoom = async (roomId) => {
  const room = await roomRepository.findById(roomId)
  console.log(room)
  if (!room) {
    throw new UserInputError('Room not found')
  }

  return room
}

export default {
  Message: {
    sender: async ({ sender }) => (
      userRepository.findById(sender)
    )
  },
  Query: {
    messages: async (_, { roomId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthenticated')
      }
      const room = await findRoom(roomId)

      const messages = await messageRepository.find({
        sender: user.id,
        room: room.id,
      })

      return messages
    }
  },
  Mutation: {
    sendMessage: async (_, { roomId, body }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthenticated')
      }
      const room = await findRoom(roomId)

      return messageRepository.create(user.id, room.id, body)
    }
  }
};
