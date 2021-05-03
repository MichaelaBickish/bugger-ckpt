import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async createNote(bugId, body) {
    debugger
    await api.post('api/notes', body)
    // AppState.notes = [...AppState.notes, res.data]
    this.getNotesByBugId(bugId)
  }

  async getNotesByBugId(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    AppState.notes = res.data
  }
}

export const notesService = new NotesService()
