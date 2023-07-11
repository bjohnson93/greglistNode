import { Auth0Provider } from "@bcwdev/auth0provider";
import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getJobs)
      .get('/:jobId', this.getJobById)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createJob)
      .delete('/:jobId', this.removeJob)
  }

  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs()
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }
  async getJobById(req, res, next) {
    try {
      const jobId = req.params.jobId
      const job = await jobsService.getJobById(jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
  async createJob(req, res, next) {
    try {
      const jobData = req.body
      jobData.creatorId = req.userInfo.id
      const job = await jobsService.createJob(jobData)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
  async removeJob(req, res, next) {
    try {
      const jobId = req.params.jobId
      const userId = req.userInfo.id
      await jobsService.removeJob(jobId, userId)
      res.send('Job has been deleted.')
    } catch (error) {
      next(error)
    }
  }

}