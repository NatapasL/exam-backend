import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

import MessageRepository from '../../repositories/message_repository'
import UserRepository from '../../repositories/user_repository'

const messageRepository = new MessageRepository()
const userRepository = new UserRepository()

export default {
  Message: {
    sender: async ({ sender }) => (
      userRepository.findOne({ _id: sender })
    )
  },
  Query: {
    messages: async (_, { roomId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthenticated')
      }

      const messages = await messageRepository.find({
        sender: mongoose.Types.ObjectId(user.id),
        room: mongoose.Types.ObjectId(roomId),
      })

      return messages
    }
  },
  Mutation: {
    sendMessage: async (_, { roomId, body }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthenticated')
      }

      return messageRepository.create(user.id, roomId, body)
    }
  }
};
