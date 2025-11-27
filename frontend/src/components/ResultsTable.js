import React from 'react';
import axios from 'axios';
import './ResultsTable.css';

function ResultsTable({ jobId, apiUrl, results, status, onReset }) {
  const handleDownload = async () => {
    try {
      // Try to download from backend first
      try {
        const response = await axios.get(`${apiUrl}/api/download/${jobId}`, {
          responseType: 'blob'
        });

        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `chatgpt-results-${jobId}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        return;
      } catch (backendErr) {
        // If backend download fails, generate CSV from frontend results
        console.log('Backend download failed, generating CSV from frontend results');
      }

      // Fallback: Generate CSV from frontend results
      const csvHeaders = 'Question,Answer,Status,Error\n';
      const csvRows = results.map(result => {
        const question = `"${(result.question || '').replace(/"/g, '""')}"`;
        const answer = `"${(result.answer || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;
        const status = result.status || 'unknown';
        const error = `"${(result.error || '').replace(/"/g, '""')}"`;
        return `${question},${answer},${status},${error}`;
      }).join('\n');
      
      const csvContent = csvHeaders + csvRows;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `chatgpt-results-${jobId}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to download CSV. Please try again.');
    }
  };

  // Show download button if completed OR if we have all results
  const isCompleted = status?.status === 'completed' || 
    (status?.total && results.length >= status.total && results.length > 0) ||
    (status?.status === 'completed' && status?.total && results.length === 0); // Allow download even if results not loaded yet

  return (
    <div className="results-table">
      <div className="results-header">
        <h2>Results ({results.length} {status?.total ? `/ ${status.total}` : ''})</h2>
        {isCompleted && (
          <div className="results-actions">
            <button onClick={handleDownload} className="download-button">
              📥 Download CSV
            </button>
            <button onClick={onReset} className="reset-button">
              🔄 New Query
            </button>
          </div>
        )}
      </div>

      {results.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className={`result-row result-row-${result.status}`}>
                  <td>{index + 1}</td>
                  <td className="question-cell">{result.question}</td>
                  <td className="answer-cell">
                    <div className="answer-content">
                      {result.answer ? (
                        <pre>{result.answer.substring(0, 500)}{result.answer.length > 500 ? '...' : ''}</pre>
                      ) : (
                        <span className="no-answer">No answer received</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-badge-${result.status}`}>
                      {result.status === 'success' && '✅'}
                      {result.status === 'failed' && '❌'}
                      {result.error && `Error: ${result.error}`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : isCompleted && (
        <div className="no-results-message">
          <p>Results are being prepared. You can download the CSV file now.</p>
        </div>
      )}

      {isCompleted && (
        <div className="completion-message">
          <p>✅ All questions processed! You can download the results as CSV.</p>
        </div>
      )}
      
      {!isCompleted && results.length > 0 && (
        <div className="completion-message" style={{ background: '#fff3cd', color: '#856404' }}>
          <p>⏳ Processing... {results.length} of {status?.total || '?'} questions completed.</p>
        </div>
      )}
    </div>
  );
}

export default ResultsTable;

