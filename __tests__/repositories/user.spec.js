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

describe('findOne', () => {
  it('find one user', async () => {
    const parsedFilters = { name: 'user1' }
    const expectedResult = { id: 1, name: 'user1' }

    const findOneMock = jest.fn(() => ({ exec: () => expectedResult }))
    jest
      .spyOn(UserRepository.prototype, 'parseFindFilters')
      .mockImplementationOnce(() => parsedFilters)
    jest
      .spyOn(UserModel, 'findOne')
      .mockImplementationOnce(findOneMock)

    const userRepository = new UserRepository()
    const user = await userRepository.findOne()

    expect(findOneMock).toHaveBeenCalledWith(parsedFilters)
    expect(user).toBe(expectedResult)
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
