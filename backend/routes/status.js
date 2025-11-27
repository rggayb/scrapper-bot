const express = require('express');
const { jobStore } = require('../services/jobStore');

const router = express.Router();

router.get('/:jobId', (req, res) => {
  try {
    const { jobId } = req.params;
    const job = jobStore.getJob(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Status error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

module.exports = router;

