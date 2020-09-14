import mongoose from 'mongoose'

import UserRepository from '../../src/repositories/user'
import UserModel from '../../src/models/user'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('create', () => {
  it('create user', async () => {
    const expectedResult = { id: 1, name: 'test' }
    const saveMock = jest.fn(() => expectedResult)
    jest
      .spyOn(UserModel.prototype, 'save')
      .mockImplementationOnce(saveMock)

    const userRepository = new UserRepository()
    const user = await userRepository.create('test')

    expect(saveMock).toHaveBeenCalled()
    expect(user).toBe(expectedResult)
  })
})

describe('find', () => {
  it('find users', async () => {
    const parsedFilters = { name: 'user1' }
    const expectedResult = [
      { id: 1, name: 'user1' },
      { id: 2, name: 'user2' }
    ]

    const findMock = jest.fn(() => ({ exec: () => expectedResult }))
    jest
      .spyOn(UserRepository.prototype, 'parseFindFilters')
      .mockImplementationOnce(() => parsedFilters)
    jest
      .spyOn(UserModel, 'find')
      .mockImplementationOnce(findMock)

    const userRepository = new UserRepository()
    const users = await userRepository.find()

    expect(findMock).toHaveBeenCalledWith(parsedFilters)
    expect(users).toBe(expectedResult)
  })
})

describe('findById', () => {
  describe('id invalid', () => {
    it('return null', async () => {
      jest
        .spyOn(mongoose.Types.ObjectId, 'isValid')
        .mockImplementationOnce(() => false)

      const userRepository = new UserRepository()
      const user = await userRepository.findById()

      expect(user).toBe(null)
    })
  })

  describe('id valid', () => {
    it('find user', async () => {
      const userId = '1'
      const expectedResult = { id: 1, name: 'user1' }
      const findByIdMock = jest.fn(() => ({ exec: () => expectedResult }))
      jest
        .spyOn(mongoose.Types, 'ObjectId')
        .mockImplementationOnce(() => userId)
      mongoose.Types.ObjectId.isValid = () => true
      jest
        .spyOn(UserModel, 'findById')
        .mockImplementationOnce(findByIdMock)

      const userRepository = new UserRepository()
      const user = await userRepository.findById()

      expect(user).toBe(expectedResult)
    })
  })
})

describe('parseFindFilters', () => {
  it('remove filter with undefined value', () => {
    const filters = {
      a: 'A',
      b: undefined,
    }
    const expectedResult = { a: 'A' }

    const userRepository = new UserRepository()
    const result = userRepository.parseFindFilters(filters)

    expect(result).toEqual(expectedResult)
  })
})
