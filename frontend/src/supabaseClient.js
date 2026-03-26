import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bhabmaesoovqorkryfny.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoYWJtYWVzb292cW9ya3J5Zm55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3OTY2MTAsImV4cCI6MjA4NzM3MjYxMH0.WC89Zx8RaEFN4dvJfE9qlR31-HR57S7hGjfDwcN_xLQ";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);