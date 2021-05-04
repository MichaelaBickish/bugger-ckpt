import { AppState } from '../AppState'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'
import router from '../router'
import Notification from '../utils/Notification'

class BugsService {
  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???')
    }
  }

  async createBug(body) {
    const res = await api.post('api/bugs', body)
    AppState.bugs = [...AppState.bugs, res.data]
    // router push to go to new bug's detail page
    router.push({ name: 'BugDetailPage', params: { id: res.data.id } })
    this.getAllBugs()
  }

  async getActiveBug(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async hideClosedBugs() {
    if (document.getElementById('filter-box').checked) {
      AppState.bugs = AppState.bugs.filter(bug => bug.closed !== true)
    } else {
      this.getAllBugs()
    }
  }

  async closeBug(activeBug, bugId) {
    await api.delete('api/bugs/' + bugId)
    if (activeBug.closed === false) {
      AppState.activeBug.closed = true
      Notification.toast('Successfully Closed!', 'success', 'top-end')
    } else {
      Notification.toast('Error')
    }
  }
}

export const bugsService = new BugsService()
