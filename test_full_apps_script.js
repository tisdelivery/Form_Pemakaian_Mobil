const url = "https://script.google.com/macros/s/AKfycbzpYXAtbE_b0sKRJIaqwQihpDQvuCgD7V9GKg_9IKxbnBa8LGfYrAPPVo5Dk0Nhhu_G/exec";

async function testFullSubmission() {
  const payload = {
    action: "submitForm",
    noForm: "FPM-TEST-9999",
    tanggalForm: "2026-08-27",
    pengguna: {
      nama: "Budi Tes",
      perusahaan: "PT Integra Solusi Mandiri",
      jabatan: "Staff IT",
      alamat: "Jakarta",
      ktp: "1234567890",
      telepon: "08123456789",
      email: "adminprojecttis@gmail.com"
    },
    pemakaian: {
      tujuan: "Kunjungan Klien",
      tglMulai: "2026-08-28",
      waktuMulai: "08:00",
      tglSelesai: "2026-08-30",
      waktuSelesai: "17:00",
      durasi: "3",
      lokasiJemput: "Kantor Pusat",
      lokasiKembali: "Kantor Pusat",
      denganDriver: "Tidak"
    },
    kendaraan: {
      jenis: "Mobil",
      merk: "Avanza",
      nopol: "B 1234 CD",
      warna: "Hitam",
      tahun: "2022",
      vin: "-",
      mesin: "-",
      kmAwal: "50000",
      levelBensin: "75",
      catatanKondisi: "Baik"
    },
    serahTerima: {
      namaDari: "Admin", jabatanDari: "GA", tglDari: "2026-08-27",
      namaKe: "Budi", jabatanKe: "Staff", tglKe: "2026-08-27",
      kelengkapan: { stnk: "Ada", kunciCadangan: "Ada", dongkrak: "Ada", banSerep: "Ada", segitiga: "Ada", p3k: "Ada", lainnya: "-" }
    }
  };

  try {
    console.log("Sending payload to Apps Script...");
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Response:", data);
  } catch(e) {
    console.error("Error:", e);
  }
}

testFullSubmission();
