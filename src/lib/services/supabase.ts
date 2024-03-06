import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types/generated-database.types";

export const supabaseClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
