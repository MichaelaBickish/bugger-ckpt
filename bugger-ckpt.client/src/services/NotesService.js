import { AppState } from '../AppState'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class NotesService {
  async createNote(body) {
    await api.post('api/notes', body)
    Notification.toast('Note Posted!', 'success', 'top-end')
    this.getNotesByBugId(body.bug)
  }

  async getNotesByBugId(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    AppState.notes = res.data
  }

  async deleteNote(noteId, bugId) {
    await api.delete('api/notes/' + noteId)
    Notification.toast('Successfully Deleted!', 'success', 'top-end')
    this.getNotesByBugId(bugId)
  }
}

export const notesService = new NotesService()
