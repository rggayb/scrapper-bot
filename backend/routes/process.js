const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { processQuestions } = require('../services/questionProcessor');
const { parseFile } = require('../services/fileParser');
const { jobStore } = require('../services/jobStore');

const router = express.Router();
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'text/csv',
      'text/comma-separated-values',
      'application/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/octet-stream',
      'text/plain'
    ];
    const fileName = file.originalname.toLowerCase();
    const isCSV = fileName.endsWith('.csv');
    const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
    
    console.log('File upload attempt:', {
      filename: file.originalname,
      mimetype: file.mimetype,
      isCSV,
      isExcel
    });
    
    if (isCSV || isExcel) {
      cb(null, true);
    } else if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Only CSV and Excel files are allowed. Received: ${file.mimetype || 'unknown'}, filename: ${file.originalname}`));
    }
  }
});

router.post('/', async (req, res) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    return upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return handleRequest(req, res);
    });
  }
  return handleRequest(req, res);
});

async function handleRequest(req, res) {
  try {
    let questions = [];

    if (req.file) {
      try {
        questions = await parseFile(req.file.path, req.file.originalname);
        
        if (questions.length === 0) {
          return res.status(400).json({ 
            error: 'No questions found in file. Please ensure the file has questions in the first column (excluding header row).' 
          });
        }
      } catch (parseError) {
        console.error('File parsing error:', parseError);
        return res.status(400).json({ 
          error: parseError.message || 'Failed to parse file. Please ensure it is a valid CSV or Excel file with questions in the first column.' 
        });
      }
    } else if (req.body.questions) {
      questions = req.body.questions
        .split('\n')
        .map(q => q.trim())
        .filter(q => q.length > 0);
    } else {
      return res.status(400).json({ 
        error: 'Please provide either a file upload or questions in the request body.' 
      });
    }

    if (questions.length === 0) {
      return res.status(400).json({ error: 'No questions provided.' });
    }

    if (questions.length > 100) {
      return res.status(400).json({ error: 'Maximum 100 questions allowed per batch.' });
    }

    const jobId = uuidv4();

    jobStore.setJob(jobId, {
      status: 'queued',
      total: questions.length,
      current: 0,
      results: [],
      createdAt: new Date().toISOString()
    });

    const io = req.app.get('io');

    processQuestions(questions, jobId, io)
      .catch(error => {
        console.error(`Job ${jobId} error:`, error);
        jobStore.updateJob(jobId, {
          status: 'failed',
          error: error.message
        });
        io.to(jobId).emit('error', { message: error.message });
      });

    res.json({
      jobId,
      status: 'queued',
      total: questions.length,
      message: `Processing ${questions.length} question(s)...`
    });

  } catch (error) {
    console.error('Process error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

module.exports = router;

