import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Function to read all notes
export const getNotes = async () => {
  const { data, error } = await supabase.from("notes").select("*");
  if (error) {
    console.error("Error fetching notes:", error);
    return { data: null, error };
  }
  return { data, error: null };
};

// Function to insert a new note
export const addNote = async (title, content) => {
  const { data, error } = await supabase.from("notes").insert([{ title, content }]);
  if (error) {
    console.error("Error adding note:", error);
    return { data: null, error };
  }
  return { data, error: null };
};