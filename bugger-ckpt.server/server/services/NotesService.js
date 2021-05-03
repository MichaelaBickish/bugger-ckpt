import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async getNotesByBugId(id) {
    const notes = await dbContext.Notes.find({ bugId: id }).populate('creator', 'name picture email')
    if (!notes) {
      throw new BadRequest('Invalid Id')
    }
    return notes
  }

  async delete(id, userId) {
    const data = await dbContext.Notes.findByIdAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Note Successfully Deleted!'
  }
}

export const notesService = new NotesService()
