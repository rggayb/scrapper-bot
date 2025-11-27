import React, { useState } from 'react';
import './App.css';
import QuestionInput from './components/QuestionInput';
import ProgressDashboard from './components/ProgressDashboard';
import ResultsTable from './components/ResultsTable';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function App() {
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleJobStart = (newJobId) => {
    setJobId(newJobId);
    setIsProcessing(true);
    setStatus({ status: 'queued', total: 0, current: 0 });
    setResults([]);
  };

  const handleJobComplete = () => {
    setIsProcessing(false);
  };

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus);
  };

  const handleResultUpdate = (result) => {
    setResults(prev => {
      // Check if result already exists (by question)
      const exists = prev.some(r => r.question === result.question);
      if (exists) {
        return prev; // Don't add duplicate
      }
      return [...prev, result];
    });
  };

  const handleReset = () => {
    setJobId(null);
    setStatus(null);
    setResults([]);
    setIsProcessing(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🤖 ChatGPT Batch Query Processor</h1>
        <p>Enter questions manually or upload a CSV/Excel file</p>
      </header>

      <main className="App-main">
        {!jobId && (
          <QuestionInput 
            apiUrl={API_URL} 
            onJobStart={handleJobStart}
          />
        )}

        {jobId && (
          <>
            <ProgressDashboard
              jobId={jobId}
              apiUrl={API_URL}
              status={status}
              isProcessing={isProcessing}
              onStatusUpdate={handleStatusUpdate}
              onResultUpdate={handleResultUpdate}
              onComplete={handleJobComplete}
            />

            {(results.length > 0 || status?.status === 'completed') && (
              <ResultsTable
                jobId={jobId}
                apiUrl={API_URL}
                results={results}
                status={status}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </main>

      <footer className="App-footer">
        <p>Powered by Puppeteer & React</p>
      </footer>
    </div>
  );
}

export default App;
