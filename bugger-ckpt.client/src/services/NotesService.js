import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async createNote(body) {
    const res = await api.post('api/notes', body)
    AppState.notes = [...AppState.notes, res.data]
    this.getNotesByBugId()
  }

  async getNotesByBugId(bugId, body) {

  }
}

export const notesService = new NotesService()
