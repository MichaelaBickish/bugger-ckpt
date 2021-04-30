import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.findBug)
    // .get('/:id/notes', getNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.create)
      // .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const data = await bugsService.find({ creatorId: req.userInfo.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async findBug(req, res, next) {
    try {
      const data = await bugsService.findById({ _id: req.params.id, creatorId: req.userInfo.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const data = await bugsService.delete(req.params.id, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
// in bug edit, invoke getone. var oldbug = . if old bug is closed, then no. if true, can edit.
// edit: use an if statement to check is bug is closed.
