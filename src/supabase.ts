import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ubdbtfkmiqldpabkvcrz.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZGJ0ZmttaXFsZHBhYmt2Y3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NTA4MzYsImV4cCI6MjA5NDUyNjgzNn0.K1i1njTsJZ3wA8tSvD7q3AAmcFZJcO-daqM3gqWwcLw";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);