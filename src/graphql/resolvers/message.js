import { AuthenticationError, UserInputError } from 'apollo-server'

import { pubsub } from '../pubsub'
import MessageRepository from '../../repositories/message'
import UserRepository from '../../repositories/user'
import RoomRepository from '../../repositories/room'

const messageRepository = new MessageRepository()
const userRepository = new UserRepository()
const roomRepository = new RoomRepository()

const findRoom = async (roomId) => {
  const room = await roomRepository.findById(roomId)

  if (!room) {
    throw new UserInputError('Room not found')
  }

  return room
}

const MESSAGE_CREATED = 'MESSAGE_CREATED'

export default {
  Message: {
    sender: async ({ sender }) => (
      userRepository.findById(sender)
    )
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_CREATED])
    }
  },
  Query: {
    messages: async (_, { roomId }) => {
      const room = await findRoom(roomId)

      const messages = await messageRepository.find({ room: room.id })

      return messages
    }
  },
  Mutation: {
    sendMessage: async (_, { roomId, body }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthenticated')
      }
      const room = await findRoom(roomId)
      const message = await messageRepository.create(user.id, room.id, body)
      pubsub.publish(MESSAGE_CREATED, { newMessage: message });

      return message
    }
  }
};
