import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query)
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById(id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  // delete- find by id and dont delete, but change bug.closed to true. and add closedDate in delete.
  // another option: get the bug, check its property, flip the value, send it back.
  async delete(id, userId) {
    const bug = await this.findById(id)
    if (bug.closed === false) {
      bug.closed = true
      const data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: userId }, bug, { new: true })
      return data
    } else if (!bug) {
      throw new BadRequest('Invalid Id')
    }
  }
}

export const bugsService = new BugsService()
