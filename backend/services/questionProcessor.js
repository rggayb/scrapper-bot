const { processSingleQuestion } = require('./chatgptScraper');
const { jobStore } = require('./jobStore');
const { randomDelay } = require('./utils');

async function processQuestions(questions, jobId, io) {
  try {
    jobStore.updateJob(jobId, { status: 'processing' });

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      
      io.to(jobId).emit('progress', {
        question,
        total: questions.length,
        current: i + 1
      });

      jobStore.updateJob(jobId, {
        current: i + 1,
        status: 'processing'
      });

      try {
        const answer = await processSingleQuestion(question);
        
        const result = {
          question,
          answer,
          status: 'success',
          error: null
        };

        const job = jobStore.getJob(jobId);
        const results = job.results || [];
        results.push(result);
        jobStore.updateJob(jobId, { results });

        io.to(jobId).emit('result', result);

        if (i < questions.length - 1) {
          const delay = randomDelay(2000, 5000);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error(`Error processing question "${question}":`, error);
        
        const result = {
          question,
          answer: null,
          status: 'error',
          error: error.message || 'Unknown error'
        };

        const job = jobStore.getJob(jobId);
        const results = job.results || [];
        results.push(result);
        jobStore.updateJob(jobId, { results });

        io.to(jobId).emit('result', result);
      }
    }

    const finalJob = jobStore.getJob(jobId);
    jobStore.updateJob(jobId, {
      status: 'completed',
      current: questions.length
    });

    io.to(jobId).emit('complete', {
      status: 'completed',
      total: questions.length,
      current: questions.length,
      results: finalJob.results || []
    });

  } catch (error) {
    console.error(`Job ${jobId} processing error:`, error);
    jobStore.updateJob(jobId, {
      status: 'failed',
      error: error.message
    });
    io.to(jobId).emit('error', { message: error.message });
    throw error;
  }
}

module.exports = { processQuestions };

