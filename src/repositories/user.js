import pickBy from 'lodash/pickBy'

import User from '../models/user'

export default class UserRepository {
  constructor() {
    this.create = this.create.bind(this)
    this.find = this.find.bind(this)
    this.findOne = this.findOne.bind(this)
  }

  async create(name) {
    const user = new User({ name })

    return user.save()
  }

  async find(filters = {}) {
    const parsedFilters = this.parseFindFilters(filters)

    return User.find(parsedFilters).exec()
  }

  async findOne(filters = {}) {
    const parsedFilters = this.parseFindFilters(filters)

    return User.findOne(parsedFilters).exec()
  }

  parseFindFilters(filters) {
    return pickBy(filters, val => val !== undefined)
  }
}
