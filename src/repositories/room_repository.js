import mongoose from 'mongoose'
import pickBy from 'lodash/pickBy'

import Room from '../models/room'

export default class RoomRepository {
  constructor() {
    this.find = this.find.bind(this)
    this.create = this.create.bind(this)
  }

  async find(filters = {}) {
    const parsedFilters = pickBy(filters, val => val !== undefined)

    return Room.find(parsedFilters).exec()
  }

  async create(name, userId) {
    const room = new Room({
      name,
      owner: mongoose.Types.ObjectId(userId),
    })

    return room.save()
  }
}
