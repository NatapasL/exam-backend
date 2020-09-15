import UserRepository from '../../repositories/user'

export const context = async ({ req }) => {
  const { userid } = req.headers

  const userRepository = new UserRepository()
  const user = await userRepository.findById(userid)

  return { user }
}
