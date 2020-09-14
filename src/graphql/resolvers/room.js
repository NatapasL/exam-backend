import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

import RoomRepository from '../../repositories/room_repository'
import UserRepository  from '../../repositories/user_repository'

const roomRepository = new RoomRepository()
const userRepository = new UserRepository()

export default {
  Room: {
    owner: async ({ owner }) => (
      userRepository.findOne({ _id: owner })
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

      return roomRepository.find({
        name,
        owner: mongoose.Types.ObjectId(user.id),
      })
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
