// Main Server File

require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware runs before every request
app.use(cors());  // Allow frontend to call backend from different port
app.use(express.json());  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data

// Import routes
const vehicleRoutes = require('./routes/vehicleRoutes');

// API Routes
app.use('/api/vehicles', vehicleRoutes);  // All vehicle endpoints start with /api/vehicles

// test if server is running
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Car Dealership API is running!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler to catch routes that don't exist
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(' ========================================');
  console.log(' Car Dealership Backend Server');
  console.log(` Running on: http://localhost:${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` Vehicles API: http://localhost:${PORT}/api/vehicles`);
  console.log(' ========================================');
});