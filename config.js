/* ============================================================
   KONFIGURASI UTAMA APLIKASI PEMAKAIAN MOBIL (SUPABASE)
   ============================================================ */
const CONFIG = {
  SUPABASE_URL: "https://rgkfswdlsqeludeubgkr.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJna2Zzd2Rsc3FlbHVkZXViZ2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MjQxNDYsImV4cCI6MjEwMzMwMDE0Nn0.ARV21uH6pXSWE1pPVa1JcT4w2KzfU6t952mgEgJVASY",

  // Password / PIN lokal untuk fitur darurat / super user
  SUPERUSER_PASSWORD: "integra2026",
  RECALL_PIN: "ism2026"
};

// Inisialisasi Supabase Client SDK
let supabaseClient = null;
function initSupabase() {
  if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  }
}
