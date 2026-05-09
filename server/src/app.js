const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// Static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Gobefikara API is running 🚀', env: process.env.NODE_ENV });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/trips/:tripId/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
