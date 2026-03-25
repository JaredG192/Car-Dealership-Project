// Supabase configuration and client initialization
// This file connects your backend to Supabase database

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get credentials from .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Check if credentials exist
if (!supabaseUrl || !supabaseKey) {
  console.error(' Missing Supabase credentials in .env file');
  console.error('Make sure SUPABASE_URL and SUPABASE_KEY are set');
  process.exit(1);  // Stop the server if no credentials
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

console.log(' Supabase client initialized');

// Export so other files can use it
module.exports = supabase;