import { AuthenticationError } from 'apollo-server'

import RoomRepository from '../../repositories/room'
import UserRepository  from '../../repositories/user'

const roomRepository = new RoomRepository()
const userRepository = new UserRepository()

export default {
  Room: {
    owner: async ({ owner }) => (
      userRepository.findById(owner)
    ),
    participants: async ({ participants }) => (
      userRepository.find({ _id: participants })
    )
  },
  Query: {
    rooms: async (_, { name }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthenticated')
      }

      return roomRepository.find({ name, owner: user.id })
    }
  },
  Mutation: {
    createRoom: async (_, { name }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthenticated')
      }

      return roomRepository.create(name, user.id)
    }
  }
};
