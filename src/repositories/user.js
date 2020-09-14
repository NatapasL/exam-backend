import mongoose from 'mongoose'
import pickBy from 'lodash/pickBy'

import UserModel from '../models/user'

export default class UserRepository {
  constructor() {
    this.create = this.create.bind(this)
    this.find = this.find.bind(this)
    this.findById = this.findById.bind(this)
  }

  async create(name) {
    const user = new UserModel({ name })

    return user.save()
  }

  async find(filters = {}) {
    const parsedFilters = this.parseFindFilters(filters)

    return UserModel.find(parsedFilters).exec()
  }

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null
    }
    const parsedId = mongoose.Types.ObjectId(id)

    return UserModel.findById(parsedId).exec()
  }

  parseFindFilters(filters) {
    return pickBy(filters, val => val !== undefined)
  }
}
