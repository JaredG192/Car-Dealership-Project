import { supabase } from "../supabaseClient";

// Get all requests from Supabase
export const getRequests = async () => {
  const { data: contacts } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: consultations } = await supabase
    .from("consultation_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const contactList = (contacts || []).map((r) => ({
    ...r,
    type: "question",
  }));

  const consultationList = (consultations || []).map((r) => ({
    ...r,
    type: "consultation",
  }));

  return [...contactList, ...consultationList].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
};

// Save contact form to Supabase
export const addContactRequest = async (request) => {
  const { error } = await supabase
    .from("contact_requests")
    .insert([request]);

  if (error) console.error("Error saving contact:", error);
};

// Save consultation form to Supabase
export const addConsultationRequest = async (request) => {
  const { error } = await supabase
    .from("consultation_requests")
    .insert([request]);

  if (error) console.error("Error saving consultation:", error);
};

// Delete a request
export const deleteRequest = async (id, type) => {
  const table = type === "consultation"
    ? "consultation_requests"
    : "contact_requests";

  await supabase.from(table).delete().eq("id", id);
};