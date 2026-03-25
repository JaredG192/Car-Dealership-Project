// Vehicle Routes
// Defines all the API endpoints for vehicles

const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// GET /api/vehicles
// Example:   /api/vehicles make/type/price
router.get('/', vehicleController.getAllVehicles);

// GET /api/vehicles/makes  Get unique makes for dropdown filter
// Must be BEFORE /:id route (otherwise "makes" would be treated as an ID)
router.get('/makes', vehicleController.getMakes);

// GET /api/vehicles/:id To get single vehicle by ID
// Example: /api/vehicles/1
router.get('/:id', vehicleController.getVehicleById);
module.exports = router;