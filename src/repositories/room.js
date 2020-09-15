import mongoose from 'mongoose'
import pickBy from 'lodash/pickBy'

import RoomModel from '../models/room'

export default class RoomRepository {
  async find(filters = {}) {
    const parsedFilters = this.parseFindFilters(filters)

    return RoomModel.find(parsedFilters).exec()
  }

  async create(name, userId) {
    const room = new RoomModel({
      name,
      owner: mongoose.Types.ObjectId(userId),
    })

    return room.save()
  }

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null
    const parsedId = mongoose.Types.ObjectId(id)

    return RoomModel.findById(parsedId).exec()
  }

  parseFindFilters(filters) {
    return pickBy(filters, val => val !== undefined)
  }
}
