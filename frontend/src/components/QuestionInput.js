import React, { useState } from 'react';
import axios from 'axios';
import './QuestionInput.css';

function QuestionInput({ apiUrl, onJobStart }) {
  const [inputMethod, setInputMethod] = useState('manual'); // 'manual' or 'file'
  const [questions, setQuestions] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!questions.trim()) {
      setError('Please enter at least one question.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${apiUrl}/api/process`, {
        questions: questions.trim()
      });

      onJobStart(response.data.jobId);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to start processing. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${apiUrl}/api/process`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      onJobStart(response.data.jobId);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to start processing. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  return (
    <div className="question-input">
      <div className="input-method-selector">
        <button
          className={inputMethod === 'manual' ? 'active' : ''}
          onClick={() => setInputMethod('manual')}
        >
          📝 Manual Entry
        </button>
        <button
          className={inputMethod === 'file' ? 'active' : ''}
          onClick={() => setInputMethod('file')}
        >
          📄 Upload File
        </button>
      </div>

      {inputMethod === 'manual' ? (
        <form onSubmit={handleManualSubmit} className="input-form">
          <div className="form-group">
            <label htmlFor="questions">
              Enter questions (one per line):
            </label>
            <textarea
              id="questions"
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="What is artificial intelligence?&#10;How does ChatGPT work?&#10;What are the best AI tools?"
              rows={10}
              disabled={isSubmitting}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? '⏳ Processing...' : '🚀 Start Processing'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleFileSubmit} className="input-form">
          <div className="form-group">
            <label htmlFor="file">
              Upload CSV or Excel file:
            </label>
            <input
              type="file"
              id="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
            <small>
              File should contain questions in the first column. Maximum file size: 10MB
            </small>
          </div>
          {file && (
            <div className="file-info">
              Selected: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
            </div>
          )}
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={isSubmitting || !file} className="submit-button">
            {isSubmitting ? '⏳ Processing...' : '🚀 Start Processing'}
          </button>
        </form>
      )}
    </div>
  );
}

export default QuestionInput;

