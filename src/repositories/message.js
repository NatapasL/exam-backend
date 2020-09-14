import mongoose from 'mongoose'
import pickBy from 'lodash/pickBy'

import Message from '../models/message'

export default class MessageRepository {
  constructor() {
    this.create = this.create.bind(this)
    this.find = this.find.bind(this)
  }

  async find(filters = {}) {
    const parsedFilters = this.parseFindFilters(filters)

    return Message.find(parsedFilters).exec()
  }

  async create(userId, roomId, body) {
    const message = new Message({
      sender: mongoose.Types.ObjectId(userId),
      room: mongoose.Types.ObjectId(roomId),
      body: body,
    })

    return message.save()
  }

  parseFindFilters(filters) {
    return pickBy(filters, val => val !== undefined)
  }
}
