const express = require('express');
const { jobStore } = require('../services/jobStore');
const { generateCSV } = require('../services/csvGenerator');

const router = express.Router();

router.get('/:jobId', (req, res) => {
  try {
    const { jobId } = req.params;
    const job = jobStore.getJob(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.status !== 'completed') {
      return res.status(400).json({ error: 'Job is not completed yet' });
    }

    const csvContent = generateCSV(job.results);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="chatgpt-results-${jobId}.csv"`);
    res.send(csvContent);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

module.exports = router;

