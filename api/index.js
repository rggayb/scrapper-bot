// Vercel Serverless Function - Main API handler
const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const processRoutes = require('../backend/routes/process');
const statusRoutes = require('../backend/routes/status');
const downloadRoutes = require('../backend/routes/download');

// Middleware
const allowedOrigins = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',').map(url => url.trim())
  : ['*'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/process', processRoutes);
app.use('/status', statusRoutes);
app.use('/download', downloadRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Export for Vercel
module.exports = app;

