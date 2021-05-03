import { AppState } from '../AppState'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'

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
    this.getAllBugs()
  }

  async getActiveBug(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }
}

export const bugsService = new BugsService()
