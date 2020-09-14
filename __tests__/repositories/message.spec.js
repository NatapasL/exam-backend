import mongoose from 'mongoose'

import MessageModel from '../../src/models/message'
import MessageRepository from '../../src/repositories/message'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('create', () => {
  it('create message', async () => {
    const expectedResult = { id: 1, name: 'message' }
    const saveMock = jest.fn(() => expectedResult)
    jest
      .spyOn(mongoose.Types, 'ObjectId')
      .mockImplementation(() => 'parsedObjectId')
    jest
      .spyOn(MessageModel.prototype, 'save')
      .mockImplementationOnce(saveMock)

    const messageRepository = new MessageRepository()
    const message = await messageRepository.create('message')

    expect(saveMock).toHaveBeenCalled()
    expect(message).toBe(expectedResult)
  })
})

describe('find', () => {
  it('find messages', async () => {
    const parsedFilter = { name: 'message' }
    const expectedResult = [{ id: 1, name: 'message' }]
    const findMock = jest.fn(() => ({ exec: () => expectedResult }))

    jest
      .spyOn(MessageRepository.prototype, 'parseFindFilters')
      .mockImplementationOnce(() => parsedFilter)
    jest
      .spyOn(MessageModel, 'find')
      .mockImplementationOnce(findMock)

    const messageRepository = new MessageRepository()
    const messages = await messageRepository.find()

    expect(findMock).toHaveBeenCalledWith(parsedFilter)
    expect(messages).toBe(expectedResult)
  })
})

describe('parseFindFilters', () => {
  it('remove filter with undefined value', () => {
    const filters = {
      a: 'A',
      b: undefined,
    }
    const expectedResult = { a: 'A' }

    const messageRepository = new MessageRepository()
    const result = messageRepository.parseFindFilters(filters)

    expect(result).toEqual(expectedResult)
  })
})
