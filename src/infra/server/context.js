import UserRepository from '../../repositories/user'

export const context = async ({ req, connection }) => {
  if (connection) {
    return connection.context
  }

  const { userid } = req.headers

  const userRepository = new UserRepository()
  const user = await userRepository.findById(userid)

  return { user }
}
