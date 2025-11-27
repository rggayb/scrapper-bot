class JobStore {
  constructor() {
    this.jobs = new Map();
  }

  setJob(jobId, jobData) {
    this.jobs.set(jobId, jobData);
  }

  getJob(jobId) {
    return this.jobs.get(jobId);
  }

  updateJob(jobId, updates) {
    const job = this.jobs.get(jobId);
    if (job) {
      this.jobs.set(jobId, { ...job, ...updates });
    }
  }

  deleteJob(jobId) {
    this.jobs.delete(jobId);
  }
}

const jobStore = new JobStore();

module.exports = { jobStore };

