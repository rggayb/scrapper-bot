import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './ProgressDashboard.css';

function ProgressDashboard({ jobId, apiUrl, status, isProcessing, onStatusUpdate, onResultUpdate, onComplete }) {
  const [socket, setSocket] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const isCompletedRef = useRef(false);

  useEffect(() => {
    // Connect to Socket.IO
    const newSocket = io(apiUrl, {
      path: '/socket.io',
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      timeout: 20000,
      forceNew: false
    });
    setSocket(newSocket);

    // Wait for connection before joining room
    const handleConnect = () => {
      console.log('Socket.IO connected:', newSocket.id);
      // Join job room after connection is established
      newSocket.emit('join', jobId);
    };

    if (newSocket.connected) {
      handleConnect();
    } else {
      newSocket.on('connect', handleConnect);
    }

    newSocket.on('connect_error', (error) => {
      console.warn('Socket.IO connection error (polling will continue):', error.message);
      // Don't show error to user, polling will handle updates
    });

    // Listen for progress updates
    newSocket.on('progress', (data) => {
      setCurrentQuestion(data.question);
      onStatusUpdate({
        status: 'processing',
        total: data.total,
        current: data.current
      });
    });

    // Listen for individual results
    newSocket.on('result', (result) => {
      onResultUpdate(result);
    });

    // Listen for completion
    newSocket.on('complete', (data) => {
      onStatusUpdate(data);
      onComplete();
    });

    // Listen for errors
    newSocket.on('error', (error) => {
      console.warn('Socket.IO error (will use polling fallback):', error.message);
      // Don't show error to user, polling will handle updates
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket.IO disconnected:', reason);
      // Polling will continue to work
    });

    // Fetch initial status
    const fetchStatus = async () => {
      // Don't fetch if already completed
      if (isCompletedRef.current) return;
      
      try {
        const response = await axios.get(`${apiUrl}/api/status/${jobId}`);
        onStatusUpdate(response.data);
        
        if (response.data.status === 'completed' || response.data.status === 'failed') {
          if (!isCompletedRef.current) {
            isCompletedRef.current = true;
            onComplete();
            // If completed, set all results at once (only once)
            if (response.data.results && response.data.results.length > 0) {
              // Use a callback to set all results at once
              response.data.results.forEach(result => {
                onResultUpdate(result);
              });
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch status:', err);
      }
    };

    fetchStatus();
    const statusInterval = setInterval(fetchStatus, 5000); // Poll every 5 seconds

    return () => {
      clearInterval(statusInterval);
      if (newSocket) {
        newSocket.emit('leave', jobId);
        newSocket.disconnect();
      }
      isCompletedRef.current = false; // Reset on unmount
    };
  }, [jobId, apiUrl, onStatusUpdate, onResultUpdate, onComplete]);

  if (!status) return null;

  const progressPercentage = status.total > 0 
    ? Math.round((status.current / status.total) * 100) 
    : 0;

  return (
    <div className="progress-dashboard">
      <h2>Processing Status</h2>
      
      <div className="status-info">
        <div className={`status-badge status-badge-${status.status}`}>
          {status.status === 'queued' && '⏳ Queued'}
          {status.status === 'processing' && '🔄 Processing'}
          {status.status === 'completed' && '✅ Completed'}
          {status.status === 'failed' && '❌ Failed'}
        </div>
      </div>

      {status.status === 'processing' && (
        <div className="current-question">
          <strong>Current Question:</strong> {currentQuestion || 'Processing...'}
        </div>
      )}

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="progress-text">
          {status.current} / {status.total} questions processed ({progressPercentage}%)
        </div>
      </div>

      {status.status === 'processing' && (
        <div className="processing-note">
          ⏳ This may take a while. Please keep this page open...
        </div>
      )}

      {status.status === 'completed' && (
        <div className="completion-actions">
          <button 
            onClick={async () => {
              try {
                const response = await axios.get(`${apiUrl}/api/download/${jobId}`, {
                  responseType: 'blob'
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
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
            }}
            className="download-button-main"
          >
            📥 Download CSV Results
          </button>
        </div>
      )}
    </div>
  );
}

export default ProgressDashboard;

