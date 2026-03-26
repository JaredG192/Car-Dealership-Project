// Vehicle Controller
// Handles all the logic for vehicle-related API endpoints

const supabase = require('../config/supabase');

/**
 * Get all vehicles with optional filters
 * Query params:
 *    make: Filter by manufacturer 
 *    type: Filter by type 
 *    sortBy: Sort field (price, year, mileage)
 *    order: asc or desc
 */
exports.getAllVehicles = async (req, res) => {
  try {
    const { make, type, sortBy = 'id', order = 'asc' } = req.query;

    // Start building query
    let query = supabase
      .from('vehicles')
      .select('*')
      .eq('status', 'available');  // Only show available vehicles

    // Apply filters if provided
    if (make) {
      query = query.eq('make', make);  // Filter by make
    }
    if (type) {
      query = query.ilike('type', type);  // Case insensitive type filter
    }

    // Apply sorting
    const validSortFields = ['price', 'year', 'mileage', 'id'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'id';
    query = query.order(sortField, { ascending: order === 'asc' });

    // Execute query
    const { data, error } = await query;

    if (error) throw error;

    // Send response
    res.json({
      success: true,
      count: data.length,
      vehicles: data
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicles',
      error: error.message
    });
  }
};

// Get single vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;  // Get ID from URL

    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();  // Expect only one result

    if (error) {
      // Check if vehicle not found
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Vehicle not found'
        });
      }
      throw error;
    }

    // Send vehicle data
    res.json({
      success: true,
      vehicle: data
    });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicle',
      error: error.message
    });
  }
};

// Get unique makes (for filter dropdown)
exports.getMakes = async (req, res) => {
  try {
    // Get all vehicles
    const { data, error } = await supabase
      .from('vehicles')
      .select('make')
      .eq('status', 'available');

    if (error) throw error;

    // Extract unique makes and sort alphabetically
    const uniqueMakes = [...new Set(data.map(v => v.make))].sort();

    res.json({
      success: true,
      makes: uniqueMakes
    });
  } catch (error) {
    console.error('Error fetching makes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching makes',
      error: error.message
    });
  }
};