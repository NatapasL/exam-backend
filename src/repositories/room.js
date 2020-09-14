import mongoose from 'mongoose'
import pickBy from 'lodash/pickBy'

import RoomModel from '../models/room'

export default class RoomRepository {
  constructor() {
    this.find = this.find.bind(this)
    this.create = this.create.bind(this)
  }

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

  parseFindFilters(filters) {
    return pickBy(filters, val => val !== undefined)
  }
}
