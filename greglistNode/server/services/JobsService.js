import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class JobsService {

  async getJobs() {
    const jobs = await dbContext.Jobs.find()

    return jobs
  }
  async getJobById(jobId) {
    const job = await dbContext.Jobs.findById(jobId)
    if (!job) {
      throw new BadRequest(`No job found with ${jobId}`)
    }
    return job
  }
  async createJob(jobData) {
    const job = await dbContext.Jobs.create(jobData)
    return job
  }
  async removeJob(jobId, userId) {
    const jobToDelete = await this.getJobById(jobId)
    if (jobToDelete.creatorId.toString() != userId) {
      throw new Forbidden(`No job found with ${jobId}`)
    }
    await jobToDelete.remove()
  }

}

export const jobsService = new JobsService()