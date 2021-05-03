import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query)
      .populate('creator', 'name picture')
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById(id)
      .populate('creator', 'name picture')
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

  async edit(body) {
    const bug = await this.findById({ _id: body.id })
    if (bug.closed === true) {
      throw new Forbidden('You Cannot Edit a Closed Bug!')
    }
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, bug, { new: true })
    return data
  }
}
export const bugsService = new BugsService()
