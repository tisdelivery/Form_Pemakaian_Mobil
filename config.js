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

/* ============================================================
   SISTEM NOTIFIKASI & KONFIRMASI IN-PAGE (BEBAS POPUP CHROME)
   ============================================================ */
(function() {
  // Inject CSS Styles untuk Toast & Custom Modal Confirm
  const style = document.createElement('style');
  style.textContent = `
    .toast-container {
      position: fixed; top: 20px; right: 20px; z-index: 999999;
      display: flex; flex-direction: column; gap: 10px; max-width: 400px; width: calc(100% - 40px);
      pointer-events: none; font-family: 'Inter', 'Segoe UI', sans-serif;
    }
    .toast {
      pointer-events: auto; background: #20232a; color: #fff; padding: 12px 16px; border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 12px; font-size: 13px;
      animation: toastIn 0.25s cubic-bezier(0.1, 0.9, 0.2, 1); border-left: 5px solid #f07d1a; line-height: 1.4;
    }
    .toast-success { border-left-color: #1e7a3c; }
    .toast-error { border-left-color: #8a1116; }
    .toast-warning { border-left-color: #f5a623; }
    .toast-info { border-left-color: #1565c0; }
    .toast.fade-out { opacity: 0; transform: translateY(-15px); transition: opacity 0.25s, transform 0.25s; }
    @keyframes toastIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }

    .custom-confirm-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 999999;
      align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px);
      font-family: 'Inter', 'Segoe UI', sans-serif;
    }
    .custom-confirm-overlay.open { display: flex; }
    .custom-confirm-card {
      background: #fff; border-radius: 12px; width: 420px; max-width: 100%; padding: 24px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.35); text-align: center; animation: confirmIn 0.2s cubic-bezier(0.1, 0.9, 0.2, 1);
    }
    @keyframes confirmIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
    .custom-confirm-icon { font-size: 36px; margin-bottom: 10px; }
    .custom-confirm-card h3 { margin: 0 0 8px; font-size: 17px; color: #1f2226; font-weight: 700; }
    .custom-confirm-card p { margin: 0 0 22px; font-size: 13.5px; color: #555; line-height: 1.5; white-space: pre-line; }
    .custom-confirm-actions { display: flex; gap: 10px; justify-content: center; }
    .custom-confirm-btn {
      flex: 1; padding: 11px 16px; border: none; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; transition: 0.15s;
    }
    .custom-confirm-btn-no { background: #eef0f2; color: #444; border: 1px solid #c9ccd1; }
    .custom-confirm-btn-no:hover { background: #e0e0e0; }
    .custom-confirm-btn-yes { background: #8a1116; color: #fff; }
    .custom-confirm-btn-yes:hover { background: #6e0d11; }
  `;
  document.head.appendChild(style);

  // Global Toast function
  window.showToast = function(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if(!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let icon = 'ℹ️';
    if(type === 'success') icon = '✅';
    else if(type === 'error') icon = '❌';
    else if(type === 'warning') icon = '⚠️';
    
    toast.innerHTML = `<span style="font-size:18px;flex-shrink:0;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // Custom Confirm Dialog (Async)
  window.customConfirm = function(title, message, icon = '❓') {
    return new Promise((resolve) => {
      let overlay = document.getElementById('customConfirmOverlay');
      if(!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'customConfirmOverlay';
        overlay.className = 'custom-confirm-overlay';
        overlay.innerHTML = `
          <div class="custom-confirm-card">
            <div class="custom-confirm-icon" id="c_icon">❓</div>
            <h3 id="c_title">Konfirmasi</h3>
            <p id="c_msg"></p>
            <div class="custom-confirm-actions">
              <button class="custom-confirm-btn custom-confirm-btn-no" id="c_no">Batal</button>
              <button class="custom-confirm-btn custom-confirm-btn-yes" id="c_yes">Ya, Lanjutkan</button>
            </div>
          </div>
        `;
        document.body.appendChild(overlay);
      }

      document.getElementById('c_icon').textContent = icon;
      document.getElementById('c_title').textContent = title || 'Konfirmasi';
      document.getElementById('c_msg').textContent = message || '';
      overlay.classList.add('open');

      document.getElementById('c_yes').onclick = () => {
        overlay.classList.remove('open');
        resolve(true);
      };
      document.getElementById('c_no').onclick = () => {
        overlay.classList.remove('open');
        resolve(false);
      };
    });
  };

  // Override window.alert to use showToast
  window.alert = function(msg) {
    let type = 'info';
    if (typeof msg === 'string') {
      if (msg.toLowerCase().includes('gagal') || msg.includes('Error') || msg.includes('❌') || msg.toLowerCase().includes('salah')) type = 'error';
      else if (msg.toLowerCase().includes('berhasil') || msg.toLowerCase().includes('tersimpan') || msg.includes('✅') || msg.toLowerCase().includes('sukses')) type = 'success';
      else if (msg.includes('⚠️') || msg.toLowerCase().includes('wajib')) type = 'warning';
    }
    window.showToast(msg, type);
  };
})();
