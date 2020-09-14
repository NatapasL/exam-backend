import UserRepository  from '../../repositories/user_repository'

const userRepository = new UserRepository()

export default {
  Query: {
    users: async (_, { name }) => userRepository.find({ name }),
  },
  Mutation: {
    createUser: async (_, { name }) => (
      userRepository.create(name)
    )
  }
};
