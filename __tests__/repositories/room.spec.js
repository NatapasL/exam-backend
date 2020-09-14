import mongoose from 'mongoose'

import RoomModel from '../../src/models/room'
import RoomRepository from '../../src/repositories/room'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('create', () => {
  it('create room', async () => {
    const expectedResult = { id: 1, name: 'room1' }
    const saveMock = jest.fn(() => expectedResult)
    jest
      .spyOn(mongoose.Types, 'ObjectId')
      .mockImplementationOnce(() => 'parsedObjectId')
    jest
      .spyOn(RoomModel.prototype, 'save')
      .mockImplementationOnce(saveMock)

    const roomRepository = new RoomRepository()
    const room = await roomRepository.create('room1')

    expect(saveMock).toHaveBeenCalled()
    expect(room).toBe(expectedResult)
  })
})

describe('find', () => {
  it('find rooms', async () => {
    const parsedFilter = { name: 'room1' }
    const expectedResult = [{ id: 1, name: 'room1' }]
    const findMock = jest.fn(() => ({ exec: () => expectedResult }))

    jest
      .spyOn(RoomRepository.prototype, 'parseFindFilters')
      .mockImplementationOnce(() => parsedFilter)
    jest
      .spyOn(RoomModel, 'find')
      .mockImplementationOnce(findMock)

    const roomRepository = new RoomRepository()
    const rooms = await roomRepository.find()

    expect(findMock).toHaveBeenCalledWith(parsedFilter)
    expect(rooms).toBe(expectedResult)
  })
})

describe('findById', () => {
  describe('id invalid', () => {
    it('return null', async () => {
      jest
        .spyOn(mongoose.Types.ObjectId, 'isValid')
        .mockImplementationOnce(() => false)

      const roomRepository = new RoomRepository()
      const room = await roomRepository.findById()

      expect(room).toBe(null)
    })
  })

  describe('id valid', () => {
    it('find room', async () => {
      const roomId = '1'
      const expectedResult = { id: 1, name: 'room1' }
      const findByIdMock = jest.fn(() => ({ exec: () => expectedResult }))
      jest
        .spyOn(mongoose.Types, 'ObjectId')
        .mockImplementationOnce(() => roomId)
      mongoose.Types.ObjectId.isValid = () => true
      jest
        .spyOn(RoomModel, 'findById')
        .mockImplementationOnce(findByIdMock)

      const roomRepository = new RoomRepository()
      const room = await roomRepository.findById()

      expect(room).toBe(expectedResult)
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

    const roomRepository = new RoomRepository()
    const result = roomRepository.parseFindFilters(filters)

    expect(result).toEqual(expectedResult)
  })
})
