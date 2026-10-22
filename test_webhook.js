const url = "https://script.google.com/macros/s/AKfycbzpYXAtbE_b0sKRJIaqwQihpDQvuCgD7V9GKg_9IKxbnBa8LGfYrAPPVo5Dk0Nhhu_G/exec";

async function testWebook() {
  try {
    const payload = { action: 'submitForm', test: true, p_nama: "Test" };
    console.log("Sending payload...");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    console.log("Status:", res.status);
    console.log("Status Text:", res.statusText);
    const text = await res.text();
    console.log("Response Body:", text);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

testWebook();
