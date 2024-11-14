import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cquusbphdaqpetdskjdx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdXVzYnBoZGFxcGV0ZHNramR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0OTEzODEsImV4cCI6MjA0NzA2NzM4MX0.X9KUZ99pEJaxyXPjDsXWOwNOomKHRWUJqm8B1jA395Q"
);

export default supabase;
