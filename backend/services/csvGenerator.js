function generateCSV(results) {
  const headers = 'Question,Answer,Status,Error\n';
  
  const rows = results.map(result => {
    const question = `"${(result.question || '').replace(/"/g, '""')}"`;
    const answer = `"${(result.answer || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;
    const status = result.status || 'unknown';
    const error = `"${(result.error || '').replace(/"/g, '""')}"`;
    return `${question},${answer},${status},${error}`;
  });

  return headers + rows.join('\n');
}

module.exports = { generateCSV };

