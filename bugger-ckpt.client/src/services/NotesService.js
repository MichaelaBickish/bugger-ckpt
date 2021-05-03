import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async createNote(body) {
    await api.post('api/notes', body)
    // AppState.notes = [...AppState.notes, body]
    this.getNotesByBugId(body.bugId)
  }

  async getNotesByBugId(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    AppState.notes = res.data
  }
}

export const notesService = new NotesService()
